import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useFetcher } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions.server";

type Order = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const meta: MetaFunction = () => {
  return [
    { title: "장바구니" },
    { name: "description", content: "장바구니 페이지입니다." }
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const orders = session.get("orders") as Order[] | undefined;
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
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = parseInt(formData.get("price") as string);

    if (!id || !name || !price) {
      return json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const orders = (session.get("orders") as Order[] | undefined) || [];
    const existingOrder = orders.find((order) => order.id === id);

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
    const id = formData.get("id") as string;
    const quantity = parseInt(formData.get("quantity") as string);

    if (!id || !quantity) {
      return json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const orders = (session.get("orders") as Order[] | undefined) || [];
    const order = orders.find((order) => order.id === id);

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
    const id = formData.get("id") as string;

    if (!id) {
      return json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const orders = (session.get("orders") as Order[] | undefined) || [];
    const filteredOrders = orders.filter((order) => order.id !== id);
    session.set("orders", filteredOrders);

    return json(
      { success: true },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }

  return json({ error: "잘못된 요청입니다." }, { status: 400 });
}

export default function Cart() {
  const data = useLoaderData<typeof loader>();
  const orders = Array.isArray(data?.orders) ? data.orders : [];
  const fetcher = useFetcher();

  const totalPrice = orders.reduce(
    (sum: number, order: Order) => sum + order.price * order.quantity,
    0
  );

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    fetcher.submit(
      { action: "update", id, quantity: newQuantity.toString() },
      { method: "post" }
    );
  };

  const removeOrder = (id: string) => {
    fetcher.submit({ action: "remove", id }, { method: "post" });
  };

  const placeOrder = () => {
    // 주문 처리 로직
    alert("주문이 완료되었습니다!");
  };

  return (
    <div className="min-h-screen bg-[#EADBBE] p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-8">장바구니</h1>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-amber-800">장바구니가 비어있습니다.</p>
            <Link
              to="/"
              className="mt-4 inline-block px-4 py-2 bg-amber-100 text-[#1a1a1a] rounded-lg hover:bg-amber-200 transition-colors"
            >
              메뉴로 돌아가기
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#EADBAB] p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-amber-800">
                        {order.name}
                      </h2>
                      <p className="text-amber-700">
                        {order.price.toLocaleString()}원
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(order.id, order.quantity - 1)
                          }
                          className="px-2 py-1 bg-amber-100 rounded hover:bg-amber-200"
                        >
                          -
                        </button>
                        <span className="text-lg">{order.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(order.id, order.quantity + 1)
                          }
                          className="px-2 py-1 bg-amber-100 rounded hover:bg-amber-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeOrder(order.id)}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[#EADBAB] rounded-lg shadow-[4px_4px_0px_0px_rgba(139,69,19,0.3)]">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-amber-800">
                  총 금액
                </span>
                <span className="text-2xl font-bold text-amber-800">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <button
                className="mt-4 w-full px-4 py-2 bg-amber-100 text-[#1a1a1a] rounded-lg hover:bg-amber-200 transition-colors"
                onClick={placeOrder}
              >
                주문하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
