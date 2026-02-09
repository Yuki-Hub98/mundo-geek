import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController.js";
import { ProdutoService } from "../services/ProdutoService.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createProdutoSchema,
  updateProdutoSchema
} from "../schemas/produto.schema.js";
import { validaPrecoProduto } from "../middlewares/validaPrecoProduto.js";

const routerProduto = Router();

const produtoService = new ProdutoService();

const produtoController = new ProdutoController(produtoService);

routerProduto.post(
  "/",
  validateSchema(createProdutoSchema),validaPrecoProduto,
  produtoController.create
);

routerProduto.put(
  "/:id",
  validateSchema(updateProdutoSchema), validaPrecoProduto,
  produtoController.update
);

routerProduto.get("/", produtoController.findAll);
routerProduto.get("/:id", produtoController.findById);
routerProduto.delete("/:id", produtoController.delete);

export default routerProduto;
