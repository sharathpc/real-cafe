import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Entities } from '../enums/index.js';
import {
  AdminSchema,
  CategorySchema,
  VendorSchema,
  ProductSchema,
  EmployeeSchema,
  OrderSchema,
} from '../models/index.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entities.Admin, schema: AdminSchema },
      { name: Entities.Category, schema: CategorySchema },
      { name: Entities.Employee, schema: EmployeeSchema },
      { name: Entities.Order, schema: OrderSchema },
      { name: Entities.Product, schema: ProductSchema },
      { name: Entities.Vendor, schema: VendorSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongooseSchemasModule {}
