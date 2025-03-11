import { Schema, Document } from 'mongoose';
import { Roles } from 'src/enums';

export interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: string;
}

export const EmployeeSchema = new Schema<IEmployee>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    role: {
      type: String,
      default: Roles.Employee,
      required: true,
    },
  },
  { timestamps: true },
);
