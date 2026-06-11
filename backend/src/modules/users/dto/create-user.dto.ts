import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { RoleType } from './role-type.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario único', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Rol del usuario', enum: RoleType })
  @IsEnum(RoleType)
  role: RoleType;
}
