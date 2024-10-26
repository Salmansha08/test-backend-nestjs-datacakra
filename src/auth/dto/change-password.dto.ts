import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'salman123' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'newsalman123' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @IsNotEmpty()
  newPassword: string;
}
