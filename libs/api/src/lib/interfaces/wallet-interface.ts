export interface WalletModel {
  id: number;
  balance_available_withdrawal: number;
  balance_pending_withdrawal: number;
  balance_available_withdrawal_format: string;
  balance_pending_withdrawal_format: string;
  total_earnings: string;
  created_at: string;
  updated_at: string;
  transactions: {
    amount: string;
    date: string;
    description: string;
    credit: boolean;
  }[]
}
