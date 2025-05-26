import { ICategory } from "./ICategory";
import { IImage } from "./IImage";
import { IVendor } from "./IVendor";

export interface IProduct {
  documentId: string;
  name: string;
  price: number;
  available: boolean;
  image: IImage;
  vendor?: IVendor;
  category?: ICategory;
}
