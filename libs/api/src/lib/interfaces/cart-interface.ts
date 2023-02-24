import { CourseModel } from "./course-interface";

export interface CartItem {
  course: CourseModel;
  quantity: number;
}

export interface CartModel {
  id: number;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}
