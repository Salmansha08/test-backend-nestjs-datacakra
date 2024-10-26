import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}
  async create(createDestinationDto: CreateDestinationDto) {
    try {
      const destination = await this.prisma.destination.create({
        data: createDestinationDto,
      });

      return destination;
    } catch (error) {
      throw new BadRequestException('Failed to create destination');
    }
  }

  async findAll() {
    try {
      const destination = await this.prisma.destination.findMany();

      if (!destination) {
        throw new NotFoundException("Destination doesn't exist");
      }

      return destination;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve destinations');
    }
  }

  async findOne(id: string) {
    try {
      const destination = await this.prisma.destination.findUnique({
        where: { id },
      });

      if (!destination) {
        throw new NotFoundException('Destination #${id} not found');
      }

      return destination;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    try {
      await this.findOne(id);

      const destination = await this.prisma.destination.update({
        where: { id },
        data: updateDestinationDto,
      });

      return destination;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Destination with ID ${id} not found`);
        }
      }
      throw new BadRequestException('Failed to update destination');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      return await this.prisma.destination.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Destination with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete destination');
    }
  }
}
