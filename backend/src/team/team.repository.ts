import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { Team } from './team.entity';

@Injectable()
export class TeamRepository extends CrudRepository<Team> {
  entityName = 'Team';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Team, dataSource);
  }
}
