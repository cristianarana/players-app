import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamRepository } from './repositories/team.repository';
import { TeamService } from './services/team.service';
import { TeamController } from './controllers/team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamController],
  providers: [TeamRepository, TeamService],
})
export class TeamModule {}
