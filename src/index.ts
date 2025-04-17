import { Hono } from "hono";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import "dotenv/config";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/users", usersRoutes);

export default app;

import { serve } from "@hono/node-server";
serve({ fetch: app.fetch, port: 3000 });
