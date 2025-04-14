import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const orders = session.get("orders");
    return json({ orders: Array.isArray(orders) ? orders : [] });
  } catch (error) {
    return json({ orders: [] });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "add") {
    const id = formData.get("id");
    const name = formData.get("name");
    const price = parseInt(formData.get("price") as string);

    if (!id || !name || !price) {
      return json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const orders = session.get("orders") || [];
    const existingOrder = orders.find((order: any) => order.id === id);

    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      orders.push({
        id,
        name,
        price,
        quantity: 1
      });
    }

    session.set("orders", orders);
    return json(
      { success: true },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }

  if (action === "update") {
    const id = formData.get("id");
    const quantity = parseInt(formData.get("quantity") as string);

    if (!id || !quantity) {
      return json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const orders = session.get("orders") || [];
    const order = orders.find((order: any) => order.id === id);

    if (order) {
      order.quantity = quantity;
      session.set("orders", orders);
      return json(
        { success: true },
        { headers: { "Set-Cookie": await commitSession(session) } }
      );
    }
  }

  if (action === "remove") {
    const id = formData.get("id");

    if (!id) {
      return json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const orders = session.get("orders") || [];
    const filteredOrders = orders.filter((order: any) => order.id !== id);
    session.set("orders", filteredOrders);

    return json(
      { success: true },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }

  return json({ error: "잘못된 요청입니다." }, { status: 400 });
}
