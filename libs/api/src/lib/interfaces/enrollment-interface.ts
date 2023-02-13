export interface EnrollmentModel {
  id: number;
  course_id: number;
  user_id: number;
  rating: number;
  review: string;
  price: number;
  price_cents: number;
  price_currency: string;
}

export type NewEnrollmentParams = Omit<
  EnrollmentModel,
  'id' | 'user_id' | 'price_cents' | 'price_currency' | 'rating' | 'review'
>;
