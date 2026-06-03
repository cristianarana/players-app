import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class CreateTrainingDto {
  @ApiProperty({ description: 'Fecha del entrenamiento (YYYY-MM-DD)' })
  @IsDateString()
  day: string;

  @ApiProperty({ description: 'Microciclo', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  microcycle: string;

  @ApiProperty({ description: 'Objetivo principal', maxLength: 500 })
  @IsString()
  @MaxLength(500)
  principal_objective: string;

  @ApiPropertyOptional({ description: 'UUIDs de los jugadores participantes' })
  @IsOptional()
  @IsUUID('4', { each: true })
  player_ids?: string[];
}
