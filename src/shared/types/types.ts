export interface Product {
  id: number;
  name: string;
  model: string;
  image: string;
  price: number;
  categories: number[];
  description: string;
  availability: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface SubCategory extends Category {
  categoryId: number;
}
