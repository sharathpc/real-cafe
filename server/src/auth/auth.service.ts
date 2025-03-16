import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVendor } from 'src/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly PEPPER: string;

  constructor(
    @InjectModel('Vendor') private readonly vendorModel: Model<IVendor>,
  ) {
    this.PEPPER = process.env.PEPPER;
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a unique salt
      const hashedPassword = await bcrypt.hash(password + this.PEPPER, salt);
      return `${hashedPassword}:${salt}`;
    } catch (err) {
      console.log(err);
    }
  }

  async validateUser(username: string, password: string): Promise<IVendor> {
    const user = await this.vendorModel.findOne({ username: username }).exec();
    if (user.email === username) {
      const [hashedPassword, salt] = user.password.split(':');
      const hash = await bcrypt.hash(password + this.PEPPER, salt);
      if (hash === hashedPassword) {
        return user;
      }
    }
    return null;
  }
}
