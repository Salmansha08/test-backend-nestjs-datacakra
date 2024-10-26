import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: RoleType.USER, enum: RoleType, required: true })
  @IsEnum(RoleType)
  @IsNotEmpty()
  name: RoleType;
}
