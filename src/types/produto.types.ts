export type CreateProdutoDTO = {
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoriaId: string;
};

export type UpdateProdutoDTO = Partial<CreateProdutoDTO>;
