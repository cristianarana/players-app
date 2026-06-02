import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { Match } from '../entities/match.entity';

@Injectable()
export class MatchRepository extends CrudRepository<Match> {
  entityName = 'Match';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Match, dataSource);
  }
}
