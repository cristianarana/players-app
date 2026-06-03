import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class CreateMatchDayDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsUUID('4')
  competition_stage_id: string;
}
