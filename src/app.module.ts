import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TravelsModule } from './travels/travels.module';
import { DestinationsModule } from './destinations/destinations.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [PrismaModule, UsersModule, TravelsModule, DestinationsModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
