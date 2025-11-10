export type MenuCategory = 'Drinks' | 'Main Dishes' | 'Desserts';

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  imageUrl?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderPayload {
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  note?: string;
  customerName?: string;
  customerPictureUrl?: string;
}

