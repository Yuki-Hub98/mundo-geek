import { z } from "zod";


export const createProdutoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().positive("Preço deve ser maior que zero"),
  estoque: z.number().int().min(0, "Estoque não pode ser negativo"),
  categoriaId: z.string().uuid("Categoria inválida"),
});

export const updateProdutoSchema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional(),
  preco: z.number().positive().optional(),
  estoque: z.number().int().min(0).optional(),
  categoriaId: z.string().uuid().optional(),
});
