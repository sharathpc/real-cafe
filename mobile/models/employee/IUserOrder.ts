import { IProduct } from "../IProduct";
import { IUser } from "../IUser";

export interface IUserOrder {
  documentId: string;
  order_status: string;
  user: IUser;
  items: {
    product: IProduct;
    quantity: number;
  }[];
}
