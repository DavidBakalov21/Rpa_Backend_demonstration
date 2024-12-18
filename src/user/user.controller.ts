import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userServ: UserService) {}

  @Get('getAllUsers')
  async getQuotes(@Res() res: Response) {
    const objects = await this.userServ.getAllUsers();
    res.json({ objects });
  }
}
