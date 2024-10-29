import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class TravelsService {
  constructor(private prisma: PrismaService) {}
  async create(createTravelDto: CreateTravelDto) {
    try {
      const travel = await this.prisma.travel.create({
        data: createTravelDto,
        include: {
          user: true,
          destination: true,
        },
      });

      return travel;
    } catch (error) {
      throw new BadRequestException('Failed to create travel');
    }
  }

  async findAll() {
    try {
      const travel = await this.prisma.travel.findMany({
        include: {
          user: true,
          destination: true,
        },
      });

      if (!travel) {
        throw new NotFoundException("Travel doesn't exist");
      }

      return travel;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve travels');
    }
  }

  async findOne(id: string) {
    try {
      const travel = await this.prisma.travel.findUnique({
        where: { id },
        include: {
          user: true,
          destination: true,
        },
      });

      if (!travel) {
        throw new NotFoundException('Travel #${id} not found');
      }

      return travel;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTravelDto: UpdateTravelDto) {
    try {
      await this.findOne(id);

      const travel = await this.prisma.travel.update({
        where: { id },
        data: updateTravelDto,
        include: {
          user: true,
          destination: true,
        },
      });

      return travel;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Travel with ID ${id} not found`);
        }
      }
      throw new BadRequestException('Failed to update travel');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      const travel = await this.prisma.travel.delete({ where: { id } });

      return travel;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Travel with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete travel');
    }
  }
}
