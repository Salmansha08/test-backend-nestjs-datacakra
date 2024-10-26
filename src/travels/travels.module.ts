import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TravelsController],
  providers: [PrismaService, TravelsService],
})
export class TravelsModule {}
