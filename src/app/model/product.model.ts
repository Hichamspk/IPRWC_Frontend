
export interface ProductModel {
  id: number;
  name: string;
  category: { id: number };
  description: string;
  price: number;
  imageUrl: string;
}

