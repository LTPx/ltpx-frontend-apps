export interface WalletModel {
  id: number;
  balance_available_withdraw: string;
  balance_pending_withdraw: string;
  total_earnings: string;
  created_at: string;
  updated_at: string;
  transactions: {
    amount: string;
    date: string;
    description: string;
  }[]
}
