import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createCategoriaSchema,
  updateCategoriaSchema
} from "../schemas/categoria.schema.js";
import { CategoriaService } from "../services/CategoriaService.js";
import { validaNomeCategoria } from "../middlewares/validaNomeCategoria.js";

const categoriaRoutes = Router();
const categoriaService = new CategoriaService();
const controller = new CategoriaController(categoriaService);

categoriaRoutes.post(
  "/",
  validateSchema(createCategoriaSchema), validaNomeCategoria,
  controller.create
);

categoriaRoutes.get("/", controller.findAll);

categoriaRoutes.get("/:id", controller.findById);

categoriaRoutes.put(
  "/:id",
  validateSchema(updateCategoriaSchema),validaNomeCategoria,
  controller.update
);

categoriaRoutes.delete("/:id", controller.delete);

export default categoriaRoutes;
