import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { Training } from '../entity/training.entity';

@Injectable()
export class TrainingRepository extends CrudRepository<Training> {
  entityName = 'Training';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Training, dataSource);
  }
}
