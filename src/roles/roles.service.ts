import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, RoleType } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.prisma.role.create({
        data: createRoleDto,
      });

      return role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Role already exists.');
        }
      }
      throw new BadRequestException('Failed to create role');
    }
  }

  async findAll() {
    try {
      const role = await this.prisma.role.findMany();
      if (!role) {
        throw new NotFoundException("Role doesn't exist");
      }
      return role;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve role');
    }
  }

  async findOne(id: string) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id },
      });

      if (!role) {
        throw new NotFoundException('Role #${id} not found');
      }

      return role;
    } catch (error) {
      throw error;
    }
  }

  async findRoleIdByName(name: string) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { name: name as RoleType },
        select: { id: true },
      });

      if (!role) {
        throw new NotFoundException(`Role with name '${name}' not found`);
      }

      return role.id;
    } catch (error) {
      throw new BadRequestException('Failed to retrieve role ID by name');
    }
  }
}
