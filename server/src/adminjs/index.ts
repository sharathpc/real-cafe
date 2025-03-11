import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  IAdmin,
  ICategory,
  IEmployee,
  IOrder,
  IProduct,
  IVendor,
} from 'src/models';
import { MongooseSchemasModule } from 'src/mongoose/mongoose.module';
import { authenticate } from './authenticate';
import { Entities } from 'src/enums';

const dateTimeStampsOptions = {
  createdAt: {
    isVisible: {
      edit: false,
      show: true,
      list: true,
      filter: true,
    },
  },
  updatedAt: {
    isVisible: {
      edit: false,
      show: true,
      list: true,
      filter: true,
    },
  },
};

const roleOptions = {
  isVisible: {
    edit: false,
    show: true,
    list: true,
    filter: true,
  },
};

const passwordOptions = {
  isVisible: {
    edit: true,
    show: false,
    list: false,
    filter: false,
  },
};

export const initializeAdminJs = import('@adminjs/nestjs').then(
  ({ AdminModule }) =>
    AdminModule.createAdminAsync({
      imports: [MongooseSchemasModule],
      inject: [
        getModelToken(Entities.Admin),
        getModelToken(Entities.Category),
        getModelToken(Entities.Employee),
        getModelToken(Entities.Order),
        getModelToken(Entities.Product),
        getModelToken(Entities.Vendor),
      ],
      useFactory: (
        adminModel: Model<IAdmin>,
        categoryModel: Model<ICategory>,
        employeeModel: Model<IEmployee>,
        orderModel: Model<IOrder>,
        productModel: Model<IProduct>,
        vendorModel: Model<IVendor>,
      ) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: adminModel,
              options: {
                properties: {
                  password: passwordOptions,
                  role: roleOptions,
                  ...dateTimeStampsOptions,
                },
              },
            },
            {
              resource: categoryModel,
              options: {
                properties: {
                  ...dateTimeStampsOptions,
                },
              },
            },
            {
              resource: employeeModel,
              options: {
                properties: {
                  password: passwordOptions,
                  role: roleOptions,
                  ...dateTimeStampsOptions,
                },
              },
            },
            {
              resource: orderModel,
              options: {
                properties: {
                  ...dateTimeStampsOptions,
                },
              },
            },
            {
              resource: productModel,
              options: {
                properties: {
                  ...dateTimeStampsOptions,
                },
              },
            },
            {
              resource: vendorModel,
              options: {
                properties: {
                  password: passwordOptions,
                  role: roleOptions,
                  ...dateTimeStampsOptions,
                },
              },
            },
          ],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
);
