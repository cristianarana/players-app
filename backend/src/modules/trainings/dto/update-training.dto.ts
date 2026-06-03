import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class UpdateTrainingDto {
  @ApiPropertyOptional({ description: 'Fecha del entrenamiento (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  day?: string;

  @ApiPropertyOptional({ description: 'Microciclo', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  microcycle?: string;

  @ApiPropertyOptional({ description: 'Objetivo principal', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  principal_objective?: string;

  @ApiPropertyOptional({ description: 'UUIDs de los jugadores participantes' })
  @IsOptional()
  @IsUUID('4', { each: true })
  player_ids?: string[];
}
