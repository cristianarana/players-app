import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerService } from './services/player.service';
import { PlayerController } from './controllers/player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerRepository, PlayerService],
})
export class PlayersModule {}
