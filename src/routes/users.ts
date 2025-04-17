import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { auth } from "@/middleware/auth";

const users = new Hono();

users.use("*", auth);

users.get("/", async (c) => {
  const userList = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
  return c.json(userList);
});

export default users;
