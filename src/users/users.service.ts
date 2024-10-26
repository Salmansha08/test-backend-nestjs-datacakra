import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('User with this email already exists.');
        }
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll() {
    try {
      const user = await this.prisma.user.findMany({
        include: {
          role: true,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve users');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { role: true },
      });

      if (!user) {
        throw new NotFoundException('User #${id} not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(id);

      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('User with this email already exists.');
        }
      }
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      const user = await this.prisma.user.delete({ where: { id } });

      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete user');
    }
  }
}
