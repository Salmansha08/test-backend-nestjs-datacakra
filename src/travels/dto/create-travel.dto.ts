import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTravelDto {
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2023-01-02T00:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: 'destination_id' })
  @IsNotEmpty()
  @IsString()
  destinationId: string;

  @ApiProperty({ example: 'user_id' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
