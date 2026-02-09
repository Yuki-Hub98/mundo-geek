import { appDataSource } from "../database/appDataSource.js";
import { Produto } from "../entities/Produto.js";
import { Categoria } from "../entities/Categoria.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateProdutoDTO,
  UpdateProdutoDTO
} from "../types/produto.types.js";

export class ProdutoService {
  private repo = appDataSource.getRepository(Produto);
  private categoriaRepo = appDataSource.getRepository(Categoria);

  public async create(data: CreateProdutoDTO): Promise<Produto> {
    const categoria = await this.categoriaRepo.findOneBy({
      id: data.categoriaId
    });

    if (!categoria) {
      throw new AppError(404, "Categoria não encontrada");
    }

    const produto = this.repo.create({
  nome: data.nome,
  preco: data.preco,
  estoque: data.estoque,
  categoria,
  ...(data.descricao && { descricao: data.descricao })
});


    return this.repo.save(produto);
  }

  public async findAll(): Promise<Produto[]> {
    return this.repo.find({
      relations: ["categoria"]
    });
  }

  public async findById(id: string): Promise<Produto> {
    const produto = await this.repo.findOne({
      where: { id },
      relations: ["categoria"]
    });

    if (!produto) {
      throw new AppError(404, "Produto não encontrado");
    }

    return produto;
  }

  public async update(
    id: string,
    data: UpdateProdutoDTO
  ): Promise<Produto> {
    const produto = await this.findById(id);

    if (data.categoriaId) {
      const categoria = await this.categoriaRepo.findOneBy({
        id: data.categoriaId
      });

      if (!categoria) {
        throw new AppError(404, "Categoria não encontrada");
      }

      produto.categoria = categoria;
    }

    Object.assign(produto, data);
    return this.repo.save(produto);
  }

  public async delete(id: string): Promise<void> {
    const produto = await this.findById(id);
    await this.repo.remove(produto);
  }
}
