import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from '../decorators/public.decorator';

const ms = (val: string): number => {
  const match = val.match(/^(\d+)(h|m|s|d)$/);
  if (!match) return 8 * 60 * 60 * 1000;
  const n = parseInt(match[1], 10);
  switch (match[2]) {
    case 'h': return n * 60 * 60 * 1000;
    case 'm': return n * 60 * 1000;
    case 's': return n * 1000;
    case 'd': return n * 24 * 60 * 60 * 1000;
    default: return 8 * 60 * 60 * 1000;
  }
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, access_token } = await this.authService.login(dto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ms(process.env.JWT_EXPIRES_IN ?? '8h'),
      path: '/',
    });

    return { user };
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { path: '/' });
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Req() req: Request) {
    const user = req.user as { id: string; username: string; role: string };
    return { user: { username: user.username, role: user.role } };
  }
}
