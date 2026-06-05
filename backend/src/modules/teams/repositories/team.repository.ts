import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { ServiceResponse } from '@shared/repository/service-response.type';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamRepository extends CrudRepository<Team> {
  entityName = 'Team';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Team, dataSource);
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
          return { success: false, message: 'Team not found', error: 'NOT_FOUND' };
        }

        return { success: true, message: 'Team deleted successfully' };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, message: 'Error deleting team', error: msg };
    }
  }
}
