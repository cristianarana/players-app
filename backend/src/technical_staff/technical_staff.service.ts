import { Injectable, NotFoundException } from '@nestjs/common';
import { TechnicalStaffRepository } from './technical_staff.repository';
import { CreateTechnicalStaffDto } from './dto/create-technical-staff.dto';
import { UpdateTechnicalStaffDto } from './dto/update-technical-staff.dto';

@Injectable()
export class TechnicalStaffService {
  constructor(private readonly repository: TechnicalStaffRepository) {}

  async create(dto: CreateTechnicalStaffDto) {
    const result = await this.repository.create(dto as any);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return result;
  }

  async findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const player = await this.repository.findOne({ where: { id } as any });
    if (!player) {
      throw new NotFoundException(`TechnicalStaff no encontrado`);
    }
    return { success: true, message: 'TechnicalStaff encontrado', data: player };
  }

  async search(fullName: string) {
    return this.repository.getByFullName(fullName);
  }

  async update(id: string, dto: UpdateTechnicalStaffDto) {
    const result = await this.repository.update(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    return result;
  }
}
