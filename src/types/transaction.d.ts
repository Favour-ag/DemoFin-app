export interface Transaction {
  id: string;
  user: string;
  email: string;
  type: "Credit" | "Debit";
  amount: number;
  status: "Pending" | "Completed" | "Refunded";
  date: string;
  description?: string;
}
