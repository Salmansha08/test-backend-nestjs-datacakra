import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [RolesModule, AuthModule],
  controllers: [TravelsController],
  providers: [PrismaService, TravelsService],
})
export class TravelsModule {}
