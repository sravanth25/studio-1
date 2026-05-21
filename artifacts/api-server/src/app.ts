import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
// @ts-ignore — pino-http typing workaround
const pinoHttpMiddleware = (pinoHttp as any).default ?? pinoHttp;
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttpMiddleware({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
