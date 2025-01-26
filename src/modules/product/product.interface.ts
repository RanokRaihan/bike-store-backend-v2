export interface IProduct {
  model: string;
  brand: string;
  price: number;
  discount?: number;
  salePrice?: number;
  category: string;
  description: string;
  quantity: number;
  inStock?: boolean;
  image?: string; //later we will use array of images
}
