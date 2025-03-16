import { Body, Controller, Post, Response } from '@nestjs/common';
import { IVendor } from 'src/models';
import { AuthService } from './auth.service';

@Controller('auth/vendor')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req: any, @Response() res: any): Promise<IVendor> {
    const { user, password } = req;
    const vendor = await this.authService.validateUser(user, password);
    if (vendor) {
      return res.status(200).json(vendor);
    }
    return res.status(401).json({ message: 'Invalid username or password' });
  }
}
