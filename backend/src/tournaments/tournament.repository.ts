import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { Tournament } from './tournament.entity';
import { ServiceResponse } from '@shared/repository/service-response.type';

@Injectable()
export class TournamentRepository extends CrudRepository<Tournament> {
  entityName = 'Tournament';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Tournament, dataSource);
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
          return { success: false, message: 'Tournament not found', error: 'NOT_FOUND' };
        }

        return { success: true, message: 'Tournament deleted successfully' };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, message: 'Error deleting tournament', error: msg };
    }
  }
}
