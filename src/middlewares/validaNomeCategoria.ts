import type { Request, Response, NextFunction } from "express";
import { CategoriaService } from "../services/CategoriaService.js";
import { AppError } from "../errors/AppError.js";

const categoriaService = new CategoriaService();

export const validaNomeCategoria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome } = req.body;

  if (!nome) return next();

  const exists = await categoriaService.findByName(nome);

  if (exists) {
    throw new AppError(409, "Já existe uma categoria com esse nome");
  }

  next();
};
