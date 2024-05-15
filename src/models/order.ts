export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
  product_name: string;
}

export interface Order {
  order_id: number;
  customer_id: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  total_amount: number;
  items: OrderItem[];  
}