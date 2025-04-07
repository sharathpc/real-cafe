import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAdmin } from 'src/models';
import argon2 from 'argon2';
const adminJs = import('adminjs');

interface LoginHandlerOptions {
  data: Record<string, any>;
  query?: Record<string, any>;
  params?: Record<string, any>;
  headers: Record<string, any>;
}

export class AuthProvider extends (await adminJs).BaseAuthProvider {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<IAdmin>,
  ) {
    super();
  }

  public override async handleLogin(opts: LoginHandlerOptions, context) {
    const { data = {} } = opts;
    const { email, password } = data;

    return this.authenticate(email, password, context);
  }

  authenticate = async (email: string, password: string, ctx: any) => {
    const admin = await this.adminModel.findOne({ email: email }).exec();
    if (admin) {
      const [hashedPassword, salt] = admin.password.split(':');
      if (await argon2.verify(hashedPassword, password)) {
        return admin;
      }
    }
    return null;
  };
}
