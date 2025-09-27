export interface FilterData {
  months: string[]
  transactionType: "entrada" | "saida" | ""
  paymentType: string[]
  client: string
}

export interface TransactionTableProps {
  title: string,
  queryParams: { id: string };
  filters?: FilterData;
}