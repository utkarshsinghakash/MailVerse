import express from "express";
import Connection from "./Database/db.js";
import dotenv from "dotenv";
import emailroute from "./routes/email.routes.js";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const PORT = 8000;

const _dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https://mailverse-1.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/email", emailroute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

Connection();
app.listen(PORT, () => {
  console.log("Server is listening on port 8000");
});
