import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({ description: 'Goles del equipo local' })
  @IsNumber()
  home_score: number;

  @ApiProperty({ description: 'Goles del equipo visitante' })
  @IsNumber()
  away_score: number;

  @ApiProperty({ description: 'Estadio del partido' })
  @IsString()
  stadium: string;

  @ApiProperty({ description: 'Fecha programada (YYYY-MM-DD)' })
  @IsDateString()
  scheduled_at: string;

  @ApiProperty({ description: 'UUID del equipo local' })
  @IsUUID('4')
  home_team_id: string;

  @ApiProperty({ description: 'UUID del equipo visitante' })
  @IsUUID('4')
  away_team_id: string;

  @ApiProperty({ description: 'UUID de la jornada' })
  @IsUUID('4')
  matchday_id: string;
}
