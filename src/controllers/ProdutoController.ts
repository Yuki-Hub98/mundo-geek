import type { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService.js";

export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  public create = async (req: Request, res: Response) => {
    const produto = await this.produtoService.create(req.body);
    return res.status(201).json(produto);
  };

  public findAll = async (_req: Request, res: Response) => {
    const produtos = await this.produtoService.findAll();
    return res.json(produtos);
  };

  public findById = async (req: Request, res: Response) => {
    const produto = await this.produtoService.findById(String(req.params.id));
    return res.json(produto);
  };

  public update = async (req: Request, res: Response) => {
    const produto = await this.produtoService.update(
      String(req.params.id),
      req.body
    );
    return res.json(produto);
  };

  public delete = async (req: Request, res: Response) => {
    await this.produtoService.delete(String(req.params.id));
    return res.status(204).send();
  };
}
