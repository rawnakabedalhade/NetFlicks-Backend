import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import logger from "morgan";
import logger from "./logger/loggerAdapter.js";
import * as url from "url";
import cors from "cors";
import errorMiddleWare from "./middlewares/error.mw.js";
import apiRouter from "./routes/api.js";
import compression from "compression";

let app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(cors());
app.use(helmet());
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

app.use("/api", apiRouter);
app.use(errorMiddleWare);

export default app;
