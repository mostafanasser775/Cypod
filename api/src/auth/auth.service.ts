/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { users } from '../data';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) { }


  validateUser(username: string, password: string) {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  userLogin(user: LoginDto, res) {
    const DB_User = this.validateUser(user.username, user.password);
    const payload = { username: DB_User.username, sub: DB_User.id, role: DB_User.role };
    const token = this.generateUserTocken(payload.sub);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true, // Set to false for local development without HTTPSS
      sameSite: 'none', // Allow cross-origin requests
    });
    res.status(200).json({ message: 'Login Successful!' });
  }

  generateUserTocken(userId: number) {
    const access_token = this.jwtService.sign({ userId });
    return access_token;
  }

}
