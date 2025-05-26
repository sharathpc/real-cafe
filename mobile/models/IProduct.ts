import { IVendor } from "./IVendor";

export interface IProduct {
  documentId: string;
  name: string;
  price: number;
  available: boolean;
  image: {
    url: string;
  };
  vendor: IVendor;
}
