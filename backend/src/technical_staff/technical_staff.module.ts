import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalStaff } from './technical_staff.entity';
import { TechnicalStaffRepository } from './technical_staff.repository';
import { TechnicalStaffService } from './technical_staff.service';
import { TechnicalStaffController } from './technical_staff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalStaff])],
  controllers: [TechnicalStaffController],
  providers: [TechnicalStaffRepository, TechnicalStaffService],
})
export class TechnicalStaffModule {}
