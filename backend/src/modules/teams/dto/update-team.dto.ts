import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateTeamDto {
  @ApiPropertyOptional({ description: 'Nombre del equipo', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ description: 'País de origen', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({ description: 'Ciudad sede', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;
}
