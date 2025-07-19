import { IProduct } from "../IProduct";
import { IUser } from "../IUser";

export interface IVendorOrder {
  documentId: string;
  order_status: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  items: {
    id: number;
    product: IProduct;
    quantity: number;
  }[];
}
