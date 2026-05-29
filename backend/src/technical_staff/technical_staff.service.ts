import { Injectable, NotFoundException } from '@nestjs/common';
import { TechnicalStaffRepository } from './technical_staff.repository';
import { CreateTechnicalStaffDto } from './dto/create-technical-staff.dto';
import { UpdateTechnicalStaffDto } from './dto/update-technical-staff.dto';

@Injectable()
export class TechnicalStaffService {
  constructor(private readonly repository: TechnicalStaffRepository) {}

  async create(dto: CreateTechnicalStaffDto) {
    const result = await this.repository.createEntity(dto as any);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return result;
  }

  async findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException('TechnicalStaff no encontrado');
    }
    return { success: true, message: 'TechnicalStaff encontrado', data: entity };
  }

  async search(fullName: string) {
    return this.repository.getByFullName(fullName);
  }

  async update(id: string, dto: UpdateTechnicalStaffDto) {
    const result = await this.repository.updateEntity(id, dto as any);
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
