import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import argon2 from 'argon2';
import { ComponentLoader } from 'adminjs';
import passwordsFeature from '@adminjs/passwords';
import { AdminModule } from '@adminjs/nestjs';

import {
  IAdmin,
  ICategory,
  IEmployee,
  IOrder,
  IProduct,
  IVendor,
} from '../models/index.js';
import { MongooseSchemasModule } from '../mongoose/mongoose.module.js';
import { Entities } from '../enums/index.js';
import { AuthProvider } from './authenticate.js';

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
  isVisible: false,
};

export const initializeAdminJs = () => {
  const componentLoader = new ComponentLoader();
  return AdminModule.createAdminAsync({
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
        componentLoader,
        resources: [
          {
            resource: adminModel,
            options: {
              properties: {
                password: {
                  isVisible: false,
                },
                role: roleOptions,
                ...dateTimeStampsOptions,
              },
            },
            features: [
              passwordsFeature({
                properties: {
                  encryptedPassword: 'password',
                  password: 'newPassword',
                },
                hash: argon2.hash,
                componentLoader,
              }),
            ],
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
            features: [
              passwordsFeature({
                properties: {
                  encryptedPassword: 'password',
                  password: 'newPassword',
                },
                hash: argon2.hash,
                componentLoader,
              }),
            ],
          },
        ],
      },
      auth: {
        cookieName: 'adminjs',
        cookiePassword: 'secret',
        provider: new AuthProvider(adminModel),
      },
      sessionOptions: {
        resave: true,
        saveUninitialized: true,
        secret: 'secret',
      },
    }),
  });
};
