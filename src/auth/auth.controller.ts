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
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'User successfully registered' })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  @ApiBadRequestResponse({ description: 'User registration failed' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Successfully logged in, JWT token returned',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the current logged-in user' })
  @ApiOkResponse({ description: 'Successfully fetched logged-in user details' })
  async getLoggedInUser(@Req() req) {
    return this.authService.getLoggedInUser(req.user);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Change password for the logged-in user' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiOkResponse({
    description: 'Password changed successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid old password' })
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(req.user, changePasswordDto);
  }
}
