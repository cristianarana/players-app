import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';
import { TournamentType } from '../entities/tournament-type.enum';

export class CreateTournamentDto {
  @ApiProperty({ description: 'Nombre del torneo', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ enum: TournamentType, enumName: 'TournamentType', description: 'Tipo de torneo (1=League, 2=NationalCup, 3=InternationalCup, 4=Friendly)' })
  @IsEnum(TournamentType)
  tournament_type: TournamentType;

  @ApiProperty({ description: 'Fecha de inicio (YYYY-MM-DD)' })
  @IsDateString()
  initial_date: string;

  @ApiProperty({ description: 'Fecha de finalización (YYYY-MM-DD)' })
  @IsDateString()
  due_date: string;

  @ApiPropertyOptional({ description: 'UUIDs de los equipos participantes' })
  @IsOptional()
  @IsUUID('4', { each: true })
  team_ids?: string[];
}
