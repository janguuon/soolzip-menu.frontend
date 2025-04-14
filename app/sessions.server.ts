import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  orders: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      secrets: ["s3cr3t"],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    }
  });
