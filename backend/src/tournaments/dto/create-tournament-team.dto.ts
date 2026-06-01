import { IsUUID } from 'class-validator';

export class CreateTournamentTeamDto {
  @IsUUID()
  tournament_id: string;

  @IsUUID()
  team_id: string;
}
