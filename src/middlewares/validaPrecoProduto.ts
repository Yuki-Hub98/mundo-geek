import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function validaPrecoProduto(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { preco } = req.body;

  // só valida se veio no body (update parcial)
  if (preco !== undefined) {
    if (typeof preco !== "number" || preco <= 0) {
      throw new AppError(
        400,
        "O preço do produto deve ser um número maior que zero"
      );
    }
  }

  next();
}
