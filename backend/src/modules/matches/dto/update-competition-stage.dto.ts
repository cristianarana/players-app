import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { CompetitionStageType } from '../entities/competition-stage-type.enum';

export class UpdateCompetitionStageDto {
  @ApiPropertyOptional({ description: 'Nombre de la fase' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: CompetitionStageType, enumName: 'CompetitionStageType', description: 'Tipo de fase (1=League_Phase, 2=Group_Stage, 3=Knockout_Stage, 4=Final_Stage)' })
  @IsOptional()
  @IsEnum(CompetitionStageType)
  stage_type?: CompetitionStageType;

  @ApiPropertyOptional({ description: 'UUID del torneo al que pertenece' })
  @IsOptional()
  @IsUUID('4')
  tournament_id?: string;
}
