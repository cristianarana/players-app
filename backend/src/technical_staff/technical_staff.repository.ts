import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@shared/repository/base-repository';
import { TechnicalStaff } from './technical_staff.entity';

@Injectable()
export class TechnicalStaffRepository extends BaseRepository<TechnicalStaff> {
  entityName = 'TechnicalStaff';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(TechnicalStaff, dataSource);
  }
}
