import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: CreateUserDto) {
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
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async findById(id: string) {
    const user = await this.repository.findOne({ where: { id } as any });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { success: true, message: 'User found', data: user };
  }

  async findByUsername(username: string) {
    const result = await this.repository.findByUsername(username);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async update(id: string, dto: UpdateUserDto) {
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
