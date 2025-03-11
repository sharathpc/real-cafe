import { OrderItem } from "./OrderItem";

export interface Order{
    items : OrderItem[];
    vendor : string;
    totalPrice : number;
}