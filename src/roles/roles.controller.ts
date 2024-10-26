import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleType } from '@prisma/client';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
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
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ description: 'Successfully retrieved roles' })
  @ApiNotFoundResponse({ description: 'No roles found' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by id' })
  @ApiOkResponse({ description: 'Successfully fetched role' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get role ID by name' })
  @ApiOkResponse({ description: 'Successfully fetched role ID' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  findRoleIdByName(@Param('name') name: RoleType) {
    return this.rolesService.findRoleIdByName(name);
  }
}
