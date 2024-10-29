import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
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
import { AuthService } from 'src/auth/auth.service';

@ApiTags('travels')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Controller('travels')
export class TravelsController {
  constructor(
    private readonly travelsService: TravelsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
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
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get all travels' })
  @ApiOkResponse({ description: 'Successfully retrieved travels' })
  @ApiNotFoundResponse({ description: 'No travels found' })
  findAll() {
    return this.travelsService.findAll();
  }

  @Get(':id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get travel by id' })
  @ApiOkResponse({ description: 'Successfully fetched travel' })
  @ApiNotFoundResponse({ description: 'Travel not found' })
  findOne(@Param('id') id: string) {
    return this.travelsService.findOne(id);
  }

  @Get('my-travels')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Get logged-in user travels' })
  @ApiOkResponse({ description: 'Successfully retrieved user travels' })
  @ApiNotFoundResponse({ description: 'No travels found for this user' })
  async findUserTravels(@Req() req) {
    const user = await this.authService.getLoggedInUser(req.user);
    return this.travelsService.findUserTravels(user.id);
  }

  @Patch(':id')
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
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Delete travel by id' })
  @ApiNoContentResponse({ description: 'Successfully deleted travel' })
  @ApiNotFoundResponse({ description: 'Travel not found' })
  remove(@Param('id') id: string) {
    return this.travelsService.remove(id);
  }
}
