import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { sign } from "jsonwebtoken";
import { hashPassword, verifyPassword } from "@/lib/hash";

const auth = new Hono();

/**
 * Authenticates a user and returns a JWT token if credentials are valid.
 * @path /login
 * @method POST
 */
auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(user.password, password))) {
    return c.text("Invalid credentials", 401);
  }

  const token = sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return c.json({ token });
});

/**
 * Creates a new user and returns their public info.
 * @path /register
 * @method POST
 */
auth.post("/register", async (c) => {
  const { email, password, name } = await c.req.json();
  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashed, name, role: "user" },
  });

  return c.json({ id: user.id, email: user.email });
});

export default auth;
