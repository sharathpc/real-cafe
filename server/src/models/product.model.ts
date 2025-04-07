import { Schema, Document } from 'mongoose';

import { Entities } from '../enums/index.js';

export interface IProduct extends Document {
  name: string;
  image: string;
  price: number;
  quantity: number;
  vendor: Schema.Types.ObjectId;
}

export const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: Entities.Vendor,
      required: true,
    },
  },
  { timestamps: true },
);
