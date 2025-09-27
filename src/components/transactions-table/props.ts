export interface FilterData {
  months: string[]
  transactionType: "entrada" | "saida" | ""
  paymentType: string[]
  clients: string[]
}

export interface TransactionTableProps {
  title: string,
  queryParams: { id: string };
  filters?: FilterData;
}