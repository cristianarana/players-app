import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerRepository } from './player.repository';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async create(dto: CreatePlayerDto) {
    const result = await this.playerRepository.create(dto as any);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return result;
  }

  async findAll() {
    return this.playerRepository.find({ where: {} as any });
  }

  async findById(id: string) {
    const result = await this.playerRepository.update(id, {});
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    const player = await this.playerRepository.findOne({ where: { id } as any });
    if (!player) {
      throw new NotFoundException(`${this.playerRepository.entityName} no encontrado`);
    }
    return { success: true, message: `${this.playerRepository.entityName} encontrado`, data: player };
  }

  async search(fullName: string) {
    return this.playerRepository.getByFullName(fullName);
  }

  async update(id: string, dto: UpdatePlayerDto) {
    const result = await this.playerRepository.update(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.playerRepository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    return result;
  }
}
