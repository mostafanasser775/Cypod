import { Controller, Post, Body,  Response  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  create(@Body() loginDto: LoginDto,@Response({ passthrough: true }) res) {
    return this.authService.userLogin(loginDto,res);
      }

  
}
