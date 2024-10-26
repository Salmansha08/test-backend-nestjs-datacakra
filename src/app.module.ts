import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TravelModule } from './travel/travel.module';
import { DestinationModule } from './destination/destination.module';
import { UsersModule } from './users/users.module';
import { TravelsModule } from './travels/travels.module';
import { DestinationsModule } from './destinations/destinations.module';

@Module({
  imports: [PrismaModule, UserModule, TravelModule, DestinationModule, UsersModule, TravelsModule, DestinationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
