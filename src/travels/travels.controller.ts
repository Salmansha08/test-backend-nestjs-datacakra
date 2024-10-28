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
import { TravelsService } from './travels.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from '@prisma/client';

@ApiTags('travels')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiBody({ type: CreateTravelDto })
  @ApiOperation({ summary: 'Create a new travel' })
  @ApiCreatedResponse({
    description: 'The travel has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelsService.create(createTravelDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get all travels' })
  @ApiOkResponse({ description: 'Successfully retrieved travels' })
  @ApiNotFoundResponse({ description: 'No travels found' })
  findAll() {
    return this.travelsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN, RoleType.USER)
  @ApiOperation({ summary: 'Get travel by id' })
  @ApiOkResponse({ description: 'Successfully fetched travel' })
  @ApiNotFoundResponse({ description: 'Travel not found' })
  findOne(@Param('id') id: string) {
    return this.travelsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiBody({ type: UpdateTravelDto })
  @ApiOperation({ summary: 'Update travel by id' })
  @ApiOkResponse({ description: 'Successfully updated travel' })
  @ApiNotFoundResponse({ description: 'Travel not found' })
  @ApiBadRequestResponse({ description: 'Invalid params data' })
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelsService.update(id, updateTravelDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Delete travel by id' })
  @ApiNoContentResponse({ description: 'Successfully deleted travel' })
  @ApiNotFoundResponse({ description: 'Travel not found' })
  remove(@Param('id') id: string) {
    return this.travelsService.remove(id);
  }
}
