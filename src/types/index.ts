export type Category = 'Hidratação' | 'Shampoo' | 'Alisamento' | 'Descoloração' | 'Oxidantes';

export const CATEGORIES: Category[] = ['Hidratação', 'Shampoo', 'Alisamento', 'Descoloração', 'Oxidantes'];

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
}

export interface Client {
  id: string;
  username: string;
  password: string;
  name: string;
  company: string;
  cnpj: string;
  phone: string;
  address: string;
  active: boolean;
  profileComplete: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
