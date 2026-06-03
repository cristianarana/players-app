import { IsString, IsNumber, IsOptional, IsDateString, Min, MaxLength } from 'class-validator';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  first_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  last_name?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nationality?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  secondary_position?: string;

  @IsOptional()
  @IsString()
  strong_foot?: string;

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
