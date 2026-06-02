import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { CompetitionStageType } from '../entities/competition-stage-type.enum';

export class UpdateCompetitionStageDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(CompetitionStageType)
  stage_type?: CompetitionStageType;

  @IsOptional()
  @IsUUID('4')
  tournament_id?: string;
}
