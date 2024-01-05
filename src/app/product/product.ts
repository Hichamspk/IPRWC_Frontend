import {Category} from "./Category";

export interface Product {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  imageUrl: string;
}
