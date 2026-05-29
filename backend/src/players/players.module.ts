import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerRepository, PlayerService],
})
export class PlayersModule {}
