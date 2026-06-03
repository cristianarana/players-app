import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsUUID } from 'class-validator';
import { CompetitionStageType } from '../entities/competition-stage-type.enum';

export class CreateCompetitionStageDto {
  @ApiProperty({ description: 'Nombre de la fase' })
  @IsString()
  name: string;

  @ApiProperty({ enum: CompetitionStageType, enumName: 'CompetitionStageType', description: 'Tipo de fase (1=League_Phase, 2=Group_Stage, 3=Knockout_Stage, 4=Final_Stage)' })
  @IsEnum(CompetitionStageType)
  stage_type: CompetitionStageType;

  @ApiProperty({ description: 'UUID del torneo al que pertenece' })
  @IsUUID('4')
  tournament_id: string;
}
