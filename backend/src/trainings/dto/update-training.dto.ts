import { IsString, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class UpdateTrainingDto {
  @IsOptional()
  @IsDateString()
  day?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  microcycle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  principal_objective?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  player_ids?: string[];
}
