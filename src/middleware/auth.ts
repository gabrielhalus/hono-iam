import { Hono, Context } from "hono";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("Please define JWT_SECRET in .env file");
  process.exit(1);
}

export const auth = async (c: Context, next: () => Promise<void>) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return c.text("Unauthorized", 401);

  const token = authHeader.split(" ")[1];
  try {
    const payload = verify(token, JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch {
    return c.text("Unauthorized", 401);
  }
};
