import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./constant.js";
import path from "path";


const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

const __dirname = path.resolve();

// add more middleware here

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// import routes here
import authRouter from "./routes/auth.route.js";


// define routes here
app.use("/api/v1/auth", authRouter);

// serve files here
app.use(express.static(path.join(__dirname, "../client", "/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

// error handler
app.use((err, req, res, next) => {
    console.log(err.message);
    return res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      data: null,
      message: err.message || "Internal Server Error",
      success: false,
    });
  });

export default app;
