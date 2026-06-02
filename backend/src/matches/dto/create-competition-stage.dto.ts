import { IsString, IsEnum, IsUUID } from 'class-validator';
import { CompetitionStageType } from '../entities/competition-stage-type.enum';

export class CreateCompetitionStageDto {
  @IsString()
  name: string;

  @IsEnum(CompetitionStageType)
  stage_type: CompetitionStageType;

  @IsUUID('4')
  tournament_id: string;
}
