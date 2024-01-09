import {Category} from "../product/Category";

export interface ProductModel {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  imageUrl: string;
}
