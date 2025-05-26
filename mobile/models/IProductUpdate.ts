export interface IProductUpdate {
  name: string;
  price: number;
  available: boolean;
  category: {
    label: string;
    value: string;
  };
}
