import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDestinationDto {
  @ApiProperty({ example: 'Borobudur Temple' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Magelang, Indonesia' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'Borobudur Temple is a religious and cultural complex in Magelang',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
