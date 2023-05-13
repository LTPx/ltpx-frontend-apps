import { PartialBy, Prettify } from './util';

export interface CategoryModel {
  id: number;
  name: string;
  count: number;
  slug: string;
  created_at: string;
  updated_at: string;
}

export type PublicCategory = Omit<
CategoryModel,
  'created_at' | 'updated_at'
>;

export interface Category {
  id?: number;
  name: string;
  slug: string;
}