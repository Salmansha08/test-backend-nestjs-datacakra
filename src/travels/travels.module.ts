import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [TravelsController],
  providers: [PrismaService, TravelsService],
})
export class TravelsModule {}
