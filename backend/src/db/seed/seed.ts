import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { User } from '../../modules/users/entities/user.entity';
import { RoleType } from '../../modules/users/dto/role-type.enum';
import AppDataSource from '../../config/typeorm.config';

async function seed() {
  AppDataSource.setOptions({
    entities: [...(AppDataSource.options.entities as any[]), User],
  });

  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const admin_exists = await queryRunner.manager.findOne(User, {
      where: [
        { username: 'admin' },
        { username: 'ADMIN' },
      ],
    });

    if (admin_exists) {
      console.log('⚠️  Admin user already exists, skipping seed.');
    } else {
      const hashedPassword = await bcrypt.hash('admin12345', 10);
      const admin = queryRunner.manager.create(User, {
        username: 'admin',
        password: hashedPassword,
        role: RoleType.ADMIN,
      });
      await queryRunner.manager.save(admin);
      console.log('✅ Admin user created successfully');
    }

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seed();
