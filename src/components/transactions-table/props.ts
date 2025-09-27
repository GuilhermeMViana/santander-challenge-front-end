export interface TransactionTableProps {
  title: string,
  id?: number;
  pagador?: string;
  recebedor?: string;
  valor?: number;
  descricao?: string;
  data?: string;
}