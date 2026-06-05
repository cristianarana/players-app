import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { RoleType } from './role-type.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Nombre de usuario único', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @ApiPropertyOptional({ description: 'Rol del usuario', enum: RoleType })
  @IsOptional()
  @IsEnum(RoleType)
  role?: RoleType;
}
