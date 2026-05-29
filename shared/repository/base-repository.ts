import { Like } from 'typeorm';
import { PersonBase } from '../entities/person-base.entity';
import { ServiceResponse } from './service-response.type';
import { CrudRepository } from './crud-repository';

export abstract class BaseRepository<T extends PersonBase> extends CrudRepository<T> {
  async deleteById(id: string): Promise<ServiceResponse<null>> {
    try {
      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await queryRunner.manager.softDelete(this.target, { id } as any);
        await queryRunner.commitTransaction();
        if (result.affected === 0) {
          return { success: false, message: `${this.entityName} no encontrado`, error: 'NOT_FOUND' };
        }
        return { success: true, message: `${this.entityName} eliminado exitosamente` };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      return { success: false, message: `Error al eliminar ${this.entityName}`, error: error.message };
    }
  }

  async getByFullName(fullName: string): Promise<ServiceResponse<T[]>> {
    try {
      const parts = fullName.trim().split(/\s+/);
      const where: any[] = [];

      if (parts.length === 1) {
        where.push(
          { first_name: Like(`%${parts[0]}%`) },
          { last_name: Like(`%${parts[0]}%`) },
        );
      } else {
        const firstName = parts.slice(0, -1).join(' ');
        const lastName = parts[parts.length - 1];
        where.push(
          { first_name: Like(`%${firstName}%`), last_name: Like(`%${lastName}%`) },
          { first_name: Like(`%${fullName}%`) },
          { last_name: Like(`%${fullName}%`) },
        );
      }

      const entities = await this.find({ where, take: 20 });
      return { success: true, message: `${this.entityName}(s) encontrado(s)`, data: entities };
    } catch (error) {
      return { success: false, message: `Error al buscar ${this.entityName}`, error: error.message };
    }
  }
}
