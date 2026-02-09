import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { appDataSource } from "./database/appDataSource.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import categoriaRoutes from "./routes/categoria.routes.js";
import produtoRoutes from "./routes/produto.routes.js";

dotenv.config();

export const app = express();

const PORT = process.env.HOST_APP || 6060;

app.set("trust proxy", 1);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: true,
  })
);

app.use(cors());
app.use(compression({ threshold: 1024 }));

app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);


app.use(errorHandler);

appDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado!");

        app.listen(PORT, () => {
               console.log(`
███╗   ███╗██╗   ██╗███╗   ██╗██████╗  ██████╗ 
████╗ ████║██║   ██║████╗  ██║██╔══██╗██╔═══██╗
██╔████╔██║██║   ██║██╔██╗ ██║██║  ██║██║   ██║
██║╚██╔╝██║██║   ██║██║╚██╗██║██║  ██║██║   ██║
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║██████╔╝╚██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝  ╚═════╝

 ██████╗ ███████╗███████╗██╗  ██╗
██╔════╝ ██╔════╝██╔════╝██║ ██╔╝
██║  ███╗█████╗  █████╗  █████╔╝ 
██║   ██║██╔══╝  ██╔══╝  ██╔═██╗ 
╚██████╔╝███████╗███████╗██║  ██╗
 ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝

🚀 Mundo Geek API iniciada com sucesso
📡 Porta: ${PORT}
`);
        })

    })
    .catch((error) => {
        console.log(error)
    })
