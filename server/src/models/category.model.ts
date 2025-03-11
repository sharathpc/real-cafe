import { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  image: string;
}

export const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);
