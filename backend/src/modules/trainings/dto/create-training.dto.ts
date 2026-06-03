import { IsString, IsDateString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class CreateTrainingDto {
  @IsDateString()
  day: string;

  @IsString()
  @MaxLength(100)
  microcycle: string;

  @IsString()
  @MaxLength(500)
  principal_objective: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  player_ids?: string[];
}
