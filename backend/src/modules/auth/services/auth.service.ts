import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    let user: User | undefined;

    try {
      const result = await this.userService.findByUsername(dto.username);
      user = result.data;
    } catch {
      // User not found — handled below as invalid credentials
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, role: user.role as string };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user: { username: user.username, role: user.role },
      access_token,
    };
  }
}
