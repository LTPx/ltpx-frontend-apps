export interface Course {
  id: string;
  image?: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  duration?: number;
  lessons?: number;
  stars?: number;
}
