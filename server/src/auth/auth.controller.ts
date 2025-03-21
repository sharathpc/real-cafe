import { Body, Controller, Post, Response } from '@nestjs/common';
import { IVendor } from 'src/models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('vendor/login')
  async vendorLogin(@Body() req: any, @Response() res: any): Promise<IVendor> {
    const { user, password } = req;
    const vendor = await this.authService.validateUser(user, password);
    if (vendor) {
      return res.status(200).json(vendor);
    }
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  @Post('admin/login')
  async adminLogin(@Body() req: any, @Response() res: any): Promise<IVendor> {
    const { user, password } = req;
    const vendor = await this.authService.validateUser(user, password);
    if (vendor) {
      return res.status(200).json(vendor);
    }
    return res.status(401).json({ message: 'Invalid username or password' });
  }
}
