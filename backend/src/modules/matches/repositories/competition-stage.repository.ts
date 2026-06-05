import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { ServiceResponse } from '@shared/repository/service-response.type';
import { CompetitionStage } from '../entities/competition-stage.entity';

@Injectable()
export class CompetitionStageRepository extends CrudRepository<CompetitionStage> {
  entityName = 'CompetitionStage';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CompetitionStage, dataSource);
  }

  async deleteById(id: string): Promise<ServiceResponse<null>> {
    try {
      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await queryRunner.manager.softDelete(this.target, { id } as any);
        await queryRunner.commitTransaction();

        if (result.affected === 0) {
          return { success: false, message: 'CompetitionStage not found', error: 'NOT_FOUND' };
        }

        return { success: true, message: 'CompetitionStage deleted successfully' };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, message: 'Error deleting competition stage', error: msg };
    }
  }
}
