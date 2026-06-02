import { IsOptional, IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsNumber()
  home_score?: number;

  @IsOptional()
  @IsNumber()
  away_score?: number;

  @IsOptional()
  @IsString()
  stadium?: string;

  @IsOptional()
  @IsDateString()
  scheduled_at?: string;

  @IsOptional()
  @IsUUID('4')
  home_team_id?: string;

  @IsOptional()
  @IsUUID('4')
  away_team_id?: string;

  @IsOptional()
  @IsUUID('4')
  matchday_id?: string;
}
