import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { MatchDay } from '../entities/match-day.entity';

@Injectable()
export class MatchDayRepository extends CrudRepository<MatchDay> {
  entityName = 'MatchDay';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(MatchDay, dataSource);
  }
}
