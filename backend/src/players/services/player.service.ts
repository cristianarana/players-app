import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PlayerRepository } from '../repositories/player.repository';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async create(dto: CreatePlayerDto) {
    const result = await this.playerRepository.createEntity(dto as any);
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async findAll() {
    try {
      return await this.playerRepository.find();
    } catch {
      throw new InternalServerErrorException('Error fetching players');
    }
  }

  async findById(id: string) {
    const player = await this.playerRepository.findOne({ where: { id } as any });
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return { success: true, message: 'Player found', data: player };
  }

  async search(fullName: string) {
    return this.playerRepository.getByFullName(fullName);
  }

  async update(id: string, dto: UpdatePlayerDto) {
    const result = await this.playerRepository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.playerRepository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
