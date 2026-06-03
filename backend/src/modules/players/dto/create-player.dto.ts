import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString, Min, MaxLength } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ description: 'Nombre del jugador', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  first_name: string;

  @ApiProperty({ description: 'Apellido del jugador', maxLength: 100 })
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
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ description: 'Altura en cm' })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ description: 'Posición principal' })
  @IsString()
  position: string;

  @ApiPropertyOptional({ description: 'Posición secundaria' })
  @IsOptional()
  @IsString()
  secondary_position?: string;

  @ApiProperty({ description: 'Pierna hábil (left/right)' })
  @IsString()
  strong_foot: string;

  @ApiPropertyOptional({ description: 'Lesión actual' })
  @IsOptional()
  @IsString()
  injury?: string;

  @ApiPropertyOptional({ description: 'Fecha de lesión' })
  @IsOptional()
  @IsDateString()
  injury_date?: string;

  @ApiPropertyOptional({ description: 'Fecha estimada de recuperación' })
  @IsOptional()
  @IsDateString()
  injury_due_date?: string;

  @ApiPropertyOptional({ description: 'Valor de mercado', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  market_value?: number;

  @ApiPropertyOptional({ description: 'Fecha del contrato' })
  @IsOptional()
  @IsDateString()
  contract_date?: string;

  @ApiPropertyOptional({ description: 'Fecha de vencimiento del contrato' })
  @IsOptional()
  @IsDateString()
  contract_due_date?: string;

  @ApiPropertyOptional({ description: 'Email de contacto' })
  @IsOptional()
  @IsString()
  contact_email?: string;

  @ApiPropertyOptional({ description: 'Teléfono de contacto' })
  @IsOptional()
  @IsNumber()
  contact_phone?: number;
}
