import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CrudRepository } from '@shared/repository/crud-repository';
import { ServiceResponse } from '@shared/repository/service-response.type';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends CrudRepository<User> {
  entityName = 'User';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(User, dataSource);
  }

  async findByUsername(username: string): Promise<ServiceResponse<User>> {
    const user = await this.findOne({ where: { username } as any });
    if (!user) {
      return { success: false, message: 'User not found', error: 'NOT_FOUND' };
    }
    return { success: true, message: 'User found', data: user };
  }

  async createEntity(dto: Partial<User>): Promise<ServiceResponse<User>> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password!, 10);
      const dtoWithHash = { ...dto, password: hashedPassword };

      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const entity = queryRunner.manager.create(this.target, dtoWithHash as any);
        const saved = await queryRunner.manager.save(entity);
        await queryRunner.commitTransaction();
        return { success: true, message: 'User created successfully', data: saved };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, message: 'Error creating user', error: msg };
    }
  }

  async deleteById(id: string): Promise<ServiceResponse<null>> {
    try {
      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await queryRunner.manager.update(
          this.target,
          { id } as any,
          { user_inactive: true, inactive_at: new Date() } as any,
        );
        await queryRunner.commitTransaction();

        if (result.affected === 0) {
          return { success: false, message: 'User not found', error: 'NOT_FOUND' };
        }

        return { success: true, message: 'User deleted successfully' };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, message: 'Error deleting user', error: msg };
    }
  }
}
