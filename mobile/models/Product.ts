export interface Product{
    _id : string;
    name : string;
    image : string;
    price  : number | 0;
    quantity? : number;
    vendor  : string;
}