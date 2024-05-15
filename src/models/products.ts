export type Product = {
  id: number;
  name: string;
  size: string;
  weight: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
}

  

  export type ProductsState =  {
    productsByCategory: {
      Sensors: Product[];
      Actuators: Product[];
      Gateways: Product[];
      
    };
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
  }