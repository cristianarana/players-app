import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class UpdateTechnicalStaffDto {
  @ApiPropertyOptional({ description: 'Nombre del miembro', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  first_name?: string;

  @ApiPropertyOptional({ description: 'Apellido del miembro', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  last_name?: string;

  @ApiPropertyOptional({ description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({ description: 'Nacionalidad', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nationality?: string;

  @ApiPropertyOptional({ description: 'Peso en kg' })
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({ description: 'Altura en cm' })
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({ description: 'Rol principal' })
  @IsOptional()
  @IsString()
  principal_role?: string;

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
