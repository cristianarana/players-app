import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class UpdateMatchDto {
  @ApiPropertyOptional({ description: 'Goles del equipo local' })
  @IsOptional()
  @IsNumber()
  home_score?: number;

  @ApiPropertyOptional({ description: 'Goles del equipo visitante' })
  @IsOptional()
  @IsNumber()
  away_score?: number;

  @ApiPropertyOptional({ description: 'Estadio del partido' })
  @IsOptional()
  @IsString()
  stadium?: string;

  @ApiPropertyOptional({ description: 'Fecha programada (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  scheduled_at?: string;

  @ApiPropertyOptional({ description: 'UUID del equipo local' })
  @IsOptional()
  @IsUUID('4')
  home_team_id?: string;

  @ApiPropertyOptional({ description: 'UUID del equipo visitante' })
  @IsOptional()
  @IsUUID('4')
  away_team_id?: string;

  @ApiPropertyOptional({ description: 'UUID de la jornada' })
  @IsOptional()
  @IsUUID('4')
  matchday_id?: string;
}
