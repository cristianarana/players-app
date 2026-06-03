import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';
import { TournamentType } from '../entities/tournament-type.enum';

export class UpdateTournamentDto {
  @ApiPropertyOptional({ description: 'Nombre del torneo', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ enum: TournamentType, enumName: 'TournamentType', description: 'Tipo de torneo (1=League, 2=NationalCup, 3=InternationalCup, 4=Friendly)' })
  @IsOptional()
  @IsEnum(TournamentType)
  tournament_type?: TournamentType;

  @ApiPropertyOptional({ description: 'Fecha de inicio (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  initial_date?: string;

  @ApiPropertyOptional({ description: 'Fecha de finalización (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  due_date?: string;

  @ApiPropertyOptional({ description: 'UUIDs de los equipos participantes' })
  @IsOptional()
  @IsUUID('4', { each: true })
  team_ids?: string[];
}
