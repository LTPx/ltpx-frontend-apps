import { BankAccount } from './teacher-interface';
import { PartialBy, Prettify } from './util';

export interface WithdrawalModel {
  id: number;
  teacher_id: string;
  amount_cents: number;
  amount: number;
  note: string;
  bank_account_number: string;
  comments: string[];
  receipt_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WithdrawalReviewAdmin {
  id: number;
  amount: number;
  amount_format: number;
  note: string;
  teacher_bank_account: BankAccount;
  teacher_name: string;
  submitted_at: string;
  approved_at: string;
  status: 'approved' | 'rejected' | 'review';
  receipt_id?: string;
  receipt_image?: string;
}

export type WithdrawalParams = Prettify<
  PartialBy<
    Omit<
      WithdrawalModel,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'teacher_id'
      | 'status'
      | 'receipt_id'
      | 'amount_cents'
      | 'comments'
    >,
    'note'
  >
>;
