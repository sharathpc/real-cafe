import { ICategory } from "./ICategory";
import { IImage } from "./IImage";
import { IUser } from "./IUser";

export interface IProduct {
  documentId: string;
  name: string;
  price: number;
  available: boolean;
  image: IImage;
  vendor?: IUser;
  category?: ICategory;
}
