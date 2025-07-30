
export type Produto = {
  id: string;
  nome: string;
  valor: number;
  imagem: string;
};

export const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Camisa Branca',
    valor: 40.00,
    imagem: '/camisa_branca.jpg',
  },
  {
    id: '2',
    nome: 'Vestido',
    valor: 120.00,
    imagem: '/vestido.webp',
  },
  {
    id: '3',
    nome: 'Calça Jeans',
    valor: 100.00,
    imagem: '/calca.jpg',
  },
  {
    id: '4',
    nome: 'Salto',
    valor: 180.00,
    imagem: '/salto.jpg',
  },
  {
    id: '5',
    nome: 'Bolsa',
    valor: 90.00,
    imagem: '/bolsa.webp',
  },
  {
    id: '6',
    nome: 'Tênis',
    valor: 180.00,
    imagem: '/tenis.webp',
  },
];