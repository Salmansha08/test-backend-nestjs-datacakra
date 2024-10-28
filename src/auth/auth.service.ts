import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { currentUser } from './dto/current-user.dto';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private roleService: RolesService,
    private jwtService: JwtService,
  ) {}

  // Register
  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const checkEmail = await this.usersService.findByEmail(registerDto.email);

      if (checkEmail) {
        throw new ConflictException('User with this email already exists');
      }

      const roleId = await this.roleService.findRoleIdByName('USER');

      if (!roleId) {
        throw new BadRequestException("Role USER doesn't exist");
      }

      const hashedPassword = await bcrypt.hash(
        registerDto.password,
        SALT_ROUNDS,
      );

      if (registerDto.password !== registerDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      const user = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
        roleId,
      });

      return user;
    } catch (error) {
      throw new BadRequestException('Registration failed');
    }
  }

  // Login
  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(loginDto.email);

      const passwordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!user || !passwordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role.name,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  // Get Logged In User
  async getLoggedInUser(user: any) {
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const detailedUser = await this.usersService.findOne(user.id);
    return detailedUser;
  }

  async validateJwtUser(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const currentUser: currentUser = {
      id: user.id,
      email: user.email,
      role: user.role.name,
    };
    return currentUser;
  }

  // Change Password
  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOne(id);

    const passwordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const newHashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      SALT_ROUNDS,
    );

    await this.usersService.update(id, {
      password: newHashedPassword,
    });

    return { message: 'Password changed successfully' };
  }
}
