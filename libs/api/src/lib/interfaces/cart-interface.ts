export interface CartItem {
  course_id: number;
  quantity: number;
  price: number;
}

export interface CartModel {
  id: number;
  courses: CartItem[];
  created_at: string;
  updated_at: string;
}
