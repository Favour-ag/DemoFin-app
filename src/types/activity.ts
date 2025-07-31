export type Activity = {
  id: string;
  type: "Credit" | "Debit";
  description: string;
  date: string;
  amount: number;
};
