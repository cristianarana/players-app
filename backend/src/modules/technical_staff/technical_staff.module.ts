import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalStaff } from './entities/technical_staff.entity';
import { TechnicalStaffRepository } from './repositories/technical_staff.repository';
import { TechnicalStaffService } from './services/technical_staff.service';
import { TechnicalStaffController } from './controllers/technical_staff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalStaff])],
  controllers: [TechnicalStaffController],
  providers: [TechnicalStaffRepository, TechnicalStaffService],
})
export class TechnicalStaffModule {}
