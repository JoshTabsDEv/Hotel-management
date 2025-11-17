import express from "express";
import cors from "cors";
import { env } from "./config/env";
import hotelRoutes from "./routes/hotelRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/hotels", hotelRoutes);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ message: "Unexpected server error" });
  },
);

app.listen(env.port, () => {
  console.log(`API running on http://localhost:${env.port}`);
});
