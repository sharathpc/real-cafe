import { Product } from "./Product";

export interface cartItem {
    _id : string | number;
    item : Product;
    count : number;
}