import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [DestinationsController],
  providers: [PrismaService, DestinationsService],
})
export class DestinationsModule {}
