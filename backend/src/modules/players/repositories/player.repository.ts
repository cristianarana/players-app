import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@shared/repository/base-repository';
import { Player } from '../entities/player.entity';

@Injectable()
export class PlayerRepository extends BaseRepository<Player> {
  entityName = 'Player';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Player, dataSource);
  }
}
