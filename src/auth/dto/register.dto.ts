import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Salman Wiharja' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'salman@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'salman123' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'salman123' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @IsNotEmpty()
  confirmPassword: string;
}
