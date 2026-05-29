import { IsString, IsNumber, IsOptional, IsDateString, Min, MaxLength } from 'class-validator';

export class CreatePlayerDto {
  // PersonBase fields
  @IsString()
  @MaxLength(100)
  first_name: string;

  @IsString()
  @MaxLength(100)
  last_name: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  @MaxLength(100)
  nationality: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  // Player-specific fields
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  secondary_position?: string;

  @IsString()
  strong_foot: string;

  @IsOptional()
  @IsString()
  injury?: string;

  @IsOptional()
  @IsDateString()
  injury_date?: string;

  @IsOptional()
  @IsDateString()
  injury_due_date?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  market_value?: number;

  @IsOptional()
  @IsDateString()
  contract_date?: string;

  @IsOptional()
  @IsDateString()
  contract_due_date?: string;
}
