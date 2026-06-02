import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { TechnicalStaffRepository } from '../repositories/technical_staff.repository';
import { CreateTechnicalStaffDto } from '../dto/create-technical-staff.dto';
import { UpdateTechnicalStaffDto } from '../dto/update-technical-staff.dto';

@Injectable()
export class TechnicalStaffService {
  constructor(private readonly repository: TechnicalStaffRepository) {}

  async create(dto: CreateTechnicalStaffDto) {
    const result = await this.repository.createEntity(dto as any);
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async findAll() {
    try {
      return await this.repository.find();
    } catch {
      throw new InternalServerErrorException('Error fetching technical staff');
    }
  }

  async findById(id: string) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException('TechnicalStaff not found');
    }
    return { success: true, message: 'TechnicalStaff found', data: entity };
  }

  async search(fullName: string) {
    return this.repository.getByFullName(fullName);
  }

  async update(id: string, dto: UpdateTechnicalStaffDto) {
    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
