import { Schema, Document } from 'mongoose';
import { Entities, Roles } from 'src/enums';

export interface IVendor extends Document {
  name: string;
  email: string;
  password: string;
  active: boolean;
  category: Schema.Types.ObjectId;
  role: string;
}

export const VendorSchema = new Schema<IVendor>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: Entities.Category,
      required: true,
    },
    role: {
      type: String,
      default: Roles.Vendor,
      required: true,
    },
  },
  { timestamps: true },
);
