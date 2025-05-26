import { IImage } from "./IImage";
import { IProduct } from "./IProduct";

export interface ICategory {
  documentId: string;
  name: string;
  image: IImage;
  products?: IProduct[];
}
