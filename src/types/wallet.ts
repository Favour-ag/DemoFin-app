// types/wallet.ts

export interface Wallet {
  _id: string;
  owner: string;
  type: string;
  currency: string;
  currencyName: string;
  ledgerBalance: string;
  lockedBalance: { $numberDecimal: string };
  availableBalance: string;
  previousAvailableBalance: { $numberDecimal: string };
  totalCredit: { $numberDecimal: string };
  totalDebit: { $numberDecimal: string };
  createdAt: string;
  updatedAt: string;
}
