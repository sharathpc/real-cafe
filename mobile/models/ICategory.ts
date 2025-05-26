import { IProduct } from "./IProduct";

export interface ICategory {
  documentId: string;
  name: string;
  image: {
    url: string;
  };
  products: IProduct[];
}
