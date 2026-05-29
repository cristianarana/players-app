import { Repository, DeepPartial, DataSource, ObjectLiteral } from 'typeorm';
import { ServiceResponse } from './service-response.type';

export abstract class CrudRepository<T extends ObjectLiteral> extends Repository<T> {
  protected abstract entityName: string;

  constructor(target: new () => T, dataSource: DataSource) {
    super(target, dataSource.manager);
  }

  async create(dto: DeepPartial<T>): Promise<ServiceResponse<T>> {
    try {
      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const entity = queryRunner.manager.create(this.target, dto as any);
        const saved = await queryRunner.manager.save(entity);
        await queryRunner.commitTransaction();
        return { success: true, message: `${this.entityName} creado exitosamente`, data: saved };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      return { success: false, message: `Error al crear ${this.entityName}`, error: error.message };
    }
  }

  async update(id: string, dto: Partial<T>): Promise<ServiceResponse<T>> {
    try {
      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const entity = await queryRunner.manager.findOne(this.target, { where: { id } as any });

        if (!entity) {
          return { success: false, message: `${this.entityName} no encontrado`, error: 'NOT_FOUND' };
        }

        const updated = queryRunner.manager.merge(this.target, entity, dto as any);
        const saved = await queryRunner.manager.save(updated);
        await queryRunner.commitTransaction();
        return { success: true, message: `${this.entityName} actualizado exitosamente`, data: saved };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      return { success: false, message: `Error al actualizar ${this.entityName}`, error: error.message };
    }
  }

  async deleteById(id: string): Promise<ServiceResponse<null>> {
    try {
      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await queryRunner.manager.delete(this.target, { id } as any);
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
}
