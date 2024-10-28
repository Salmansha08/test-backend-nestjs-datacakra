import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiBody({ type: CreateRoleDto })
  @ApiOperation({ summary: 'Create a new role' })
  @ApiCreatedResponse({
    description: 'The role has been successfully created.',
  })
  @ApiConflictResponse({ description: 'Role already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ description: 'Successfully retrieved roles' })
  @ApiNotFoundResponse({ description: 'No roles found' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get role by id' })
  @ApiOkResponse({ description: 'Successfully fetched role' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Get('name/:name')
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get role ID by name' })
  @ApiOkResponse({ description: 'Successfully fetched role ID' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  findRoleIdByName(@Param('name') name: RoleType) {
    return this.rolesService.findRoleIdByName(name);
  }
}
