import { appDataSource } from "../database/appDataSource.js";
import { Categoria } from "../entities/Categoria.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateCategoriaDTO,
  UpdateCategoriaDTO
} from "../types/categoria.types.js";

export class CategoriaService {
  private repo = appDataSource.getRepository(Categoria);

  public async create(data: CreateCategoriaDTO): Promise<Categoria> {
    const exists = await this.repo.findOne({
      where: { nome: data.nome }
    });

    if (exists) {
      throw new AppError(409, "Categoria já cadastrada");
    }

    const categoria = this.repo.create(data);
    return this.repo.save(categoria);
  }

  public async findAll(): Promise<Categoria[]> {
    return this.repo.find({ relations: ["produtos"] });
  }

  public async findById(id: string): Promise<Categoria> {
    const categoria = await this.repo.findOne({
      where: { id },
      relations: ["produtos"]
    });

    if (!categoria) {
      throw new AppError(404, "Categoria não encontrada");
    }

    return categoria;
  }

  public async findByName(nome: string): Promise<Categoria | null> {
    return this.repo.findOne({
      where: { nome }
    });
  }

  public async update(
    id: string,
    data: UpdateCategoriaDTO
  ): Promise<Categoria> {
    const categoria = await this.findById(id);

    if (data.nome && data.nome !== categoria.nome) {
      const exists = await this.repo.findOne({
        where: { nome: data.nome }
      });

      if (exists) {
        throw new AppError(409, "Nome da categoria já em uso");
      }
    }

    Object.assign(categoria, data);
    return this.repo.save(categoria);
  }

  public async delete(id: string): Promise<void> {
    const categoria = await this.findById(id);

    if (categoria.produtos?.length) {
      throw new AppError(
        400,
        "Não é possível excluir categoria com produtos vinculados"
      );
    }

    await this.repo.remove(categoria);
  }
}
