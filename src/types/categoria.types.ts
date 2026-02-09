export type CreateCategoriaDTO = {
  nome: string;
  descricao?: string;
};

export type UpdateCategoriaDTO = Partial<CreateCategoriaDTO>;
