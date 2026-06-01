import { IsString, IsEnum, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';
import { TournamentType } from '../tournament-type.enum';

export class CreateTournamentDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEnum(TournamentType)
  tournament_type: TournamentType;

  @IsDateString()
  initial_date: string;

  @IsDateString()
  due_date: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  team_ids?: string[];
}
