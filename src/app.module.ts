import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TravelsModule } from './travels/travels.module';
import { DestinationsModule } from './destinations/destinations.module';

@Module({
  imports: [PrismaModule, UsersModule, TravelsModule, DestinationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
