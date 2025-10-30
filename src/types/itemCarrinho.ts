export interface ItemCarrinho {
  id: number;
  livro: {
    id: number;
    titulo: string;
    capa_url?: string;
    preco: string;
    autores: string[];
  };
  quantidade: number;
}