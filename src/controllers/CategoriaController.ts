import type { Request, Response } from "express";
import { CategoriaService } from "../services/CategoriaService.js";

export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  public create = async (req: Request, res: Response) => {
    const categoria = await this.categoriaService.create(req.body);
    return res.status(201).json(categoria);
  };

  public findAll = async (_req: Request, res: Response) => {
    const categorias = await this.categoriaService.findAll();
    return res.json(categorias);
  };

  public findById = async (req: Request, res: Response) => {
    const categoria = await this.categoriaService.findById(String(req.params.id));
    return res.json(categoria);
  };

  public update = async (req: Request, res: Response) => {
    const categoria = await this.categoriaService.update(
      String(req.params.id),
      req.body
    );
    return res.json(categoria);
  };

  public delete = async (req: Request, res: Response) => {
    await this.categoriaService.delete(String(req.params.id));
    return res.status(204).send();
  };
}
