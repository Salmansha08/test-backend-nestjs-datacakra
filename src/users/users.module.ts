import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
