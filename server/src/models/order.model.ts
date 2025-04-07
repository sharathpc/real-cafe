import { Schema, Document } from 'mongoose';

import { Entities, Statuses } from '../enums/index.js';

export interface IOrder extends Document {
  status: string;
  employee: Schema.Types.ObjectId;
  items: [];
}

export const OrderSchema = new Schema<IOrder>(
  {
    status: {
      type: String,
      enum: Statuses,
      default: Statuses.Available,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: Entities.Employee,
      required: true,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: Entities.Product,
          required: true,
        },
        count: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);
