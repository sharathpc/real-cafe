import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import argon2 from 'argon2';
import { BaseAuthProvider } from 'adminjs';

import { IAdmin } from '../models/index.js';

interface LoginHandlerOptions {
  data: Record<string, any>;
  query?: Record<string, any>;
  params?: Record<string, any>;
  headers: Record<string, any>;
}

export class AuthProvider extends BaseAuthProvider {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<IAdmin>,
  ) {
    super();
  }

  public getUiProps(): Record<string, any> {
    return {};
  }

  public async handleLogin(opts: LoginHandlerOptions) {
    const { email, password } = opts.data;
    const admin = await this.adminModel.findOne({ email: email }).exec();
    if (admin) {
      if (await argon2.verify(admin.password, password)) {
        return admin;
      }
    }
    return null;
  }

  public async handleLogout(context?: any): Promise<any> {
    console.log(context);
    return Promise.resolve();
  }

  public async handleRefreshToken(
    opts: LoginHandlerOptions,
    context?: any,
  ): Promise<any> {
    console.log(opts, context);
    return Promise.resolve({});
  }
}
