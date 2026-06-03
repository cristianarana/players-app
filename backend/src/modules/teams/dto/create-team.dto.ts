import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ description: 'Nombre del equipo', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'País de origen', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  country: string;

  @ApiProperty({ description: 'Ciudad sede', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  city: string;
}
