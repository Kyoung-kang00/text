import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({ origin: ALLOWED_ORIGIN === "*" ? true : ALLOWED_ORIGIN }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "백엔드 서버 정상 작동 중입니다." });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
