import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { CompetitionStage } from '../entities/competition-stage.entity';

@Injectable()
export class MatchesRepository extends CrudRepository<CompetitionStage> {
  entityName = 'CompetitionStage';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CompetitionStage, dataSource);
  }
}
