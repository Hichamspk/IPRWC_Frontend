import {Category} from "../product/Category";

export interface ProductModel {
  id: number;
  name: string;
  category: { id: number }; // Changed to nested object
  description: string;
  price: number;
  imageUrl: string;
}

