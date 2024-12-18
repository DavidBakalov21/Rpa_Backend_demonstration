import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './pseudo-auth.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authServ: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: AuthDto, @Res() res: Response) {
    const regResult = await this.authServ.Register(registerDto);
    res.json({ regResult });
  }

  @Post('login')
  async login(@Body() registerDto: AuthDto, @Res() res: Response) {
    const logResult = await this.authServ.Login(registerDto);
    res.json({ logResult });
  }
}
