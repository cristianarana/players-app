import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

export class CreateTechnicalStaffDto {
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
  weight?: number;

  @IsOptional()
  height?: number;

  @IsString()
  principal_role: string;

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
