import { IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class CreateMatchDto {
  @IsNumber()
  home_score: number;

  @IsNumber()
  away_score: number;

  @IsString()
  stadium: string;

  @IsDateString()
  scheduled_at: string;

  @IsUUID('4')
  home_team_id: string;

  @IsUUID('4')
  away_team_id: string;

  @IsUUID('4')
  matchday_id: string;
}
