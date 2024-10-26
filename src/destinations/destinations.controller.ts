import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  @ApiBody({ type: CreateDestinationDto })
  @ApiOperation({ summary: 'Create a new destination' })
  @ApiCreatedResponse({
    description: 'The destination has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid destination data' })
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all destinations' })
  @ApiOkResponse({ description: 'Successfully retrieved destinations' })
  @ApiNotFoundResponse({ description: 'No destinations found' })
  findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a destination by ID' })
  @ApiOkResponse({ description: 'Successfully fetched destination' })
  @ApiNotFoundResponse({ description: 'Destination not found' })
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateDestinationDto })
  @ApiOperation({ summary: 'Update destination by id' })
  @ApiOkResponse({ description: 'Successfully updated destination' })
  @ApiNotFoundResponse({ description: 'Destination not found' })
  @ApiBadRequestResponse({ description: 'Invalid params data' })
  update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationsService.update(id, updateDestinationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete destination by id' })
  @ApiNoContentResponse({ description: 'Successfully deleted destination' })
  @ApiNotFoundResponse({ description: 'Destination not found' })
  remove(@Param('id') id: string) {
    return this.destinationsService.remove(id);
  }
}
