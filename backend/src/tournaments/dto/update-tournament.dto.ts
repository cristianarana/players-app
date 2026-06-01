import { IsString, IsEnum, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';
import { TournamentType } from '../tournament-type.enum';

export class UpdateTournamentDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEnum(TournamentType)
  tournament_type?: TournamentType;

  @IsOptional()
  @IsDateString()
  initial_date?: string;

  @IsOptional()
  @IsDateString()
  due_date?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  team_ids?: string[];
}
