import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// super-minimal endpoints
app.get("/api/ping", (_req, res) => res.json({ ok: true, data: "pong" }));
app.get("/api/hello", (req, res) => {
  const name = (req.query.name as string) || "world";
  res.json({ message: `Hello, ${name}!` });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
