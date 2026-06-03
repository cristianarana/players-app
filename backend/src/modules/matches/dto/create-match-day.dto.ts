import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class CreateMatchDayDto {
  @ApiProperty({ description: 'Nombre de la jornada' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Fecha de inicio (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({ description: 'Fecha de finalización (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({ description: 'UUID de la fase de competición' })
  @IsUUID('4')
  competition_stage_id: string;
}
