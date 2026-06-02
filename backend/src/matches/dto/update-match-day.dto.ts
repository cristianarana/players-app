import { IsOptional, IsString, IsDateString, IsUUID } from 'class-validator';

export class UpdateMatchDayDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsUUID('4')
  competition_stage_id?: string;
}
