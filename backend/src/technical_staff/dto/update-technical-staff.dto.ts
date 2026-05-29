import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class UpdateTechnicalStaffDto {
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
  weight?: number;

  @IsOptional()
  height?: number;

  @IsOptional()
  @IsString()
  principal_role?: string;

  @IsOptional()
  @IsString()
  secondary_role?: string;

  @IsOptional()
  @IsDateString()
  contract_date?: string;

  @IsOptional()
  @IsDateString()
  contract_due_date?: string;
}
