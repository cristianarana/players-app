import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateTechnicalStaffDto {
  @ApiProperty({ description: 'Nombre del miembro', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  first_name: string;

  @ApiProperty({ description: 'Apellido del miembro', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  last_name: string;

  @ApiProperty({ description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  @IsDateString()
  birthdate: string;

  @ApiProperty({ description: 'Nacionalidad', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  nationality: string;

  @ApiPropertyOptional({ description: 'Peso en kg' })
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({ description: 'Altura en cm' })
  @IsOptional()
  height?: number;

  @ApiProperty({ description: 'Rol principal' })
  @IsString()
  principal_role: string;

  @ApiPropertyOptional({ description: 'Rol secundario' })
  @IsOptional()
  @IsString()
  secondary_role?: string;

  @ApiPropertyOptional({ description: 'Fecha del contrato' })
  @IsOptional()
  @IsDateString()
  contract_date?: string;

  @ApiPropertyOptional({ description: 'Fecha de vencimiento del contrato' })
  @IsOptional()
  @IsDateString()
  contract_due_date?: string;
}
