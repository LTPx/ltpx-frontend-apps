export interface WalletModel {
  id: number;
  balance_available_withdrawal: string;
  balance_pending_withdrawal: string;
  total_earnings: string;
  created_at: string;
  updated_at: string;
  transactions: {
    amount: string;
    date: string;
    description: string;
  }[]
}
