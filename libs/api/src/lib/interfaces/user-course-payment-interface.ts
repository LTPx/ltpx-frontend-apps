export interface UserCoursePaymentModel {
  id: number;
  course_id: number;
  user_id: number;
  description: string;
  receipt_id: string;
  payment_gateway: string;
  amount: number;
  amount_cents: number;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: number;
  course_id: number;
  description: string;
  payment_gateway: string;
  amount: number;
  amount_cents: number;
  amount_format: number;
  purchase_date: string;
}

export type NewUserCoursePaymentParams = Omit<
  UserCoursePaymentModel,
  'id' | 'user_id' | 'amount_cents' | 'created_at' | 'updated_at'
>;
