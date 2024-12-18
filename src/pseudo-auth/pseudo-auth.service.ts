import { Injectable, Res } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async Register(auth: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        userName: auth.username,
      },
    });
    if (!user) {
      await this.prisma.user.create({
        data: {
          userName: auth.username,
          password: await this.hashPassword(auth.password),
        },
      });
      return true;
    }
    return false;
  }

  async Login(auth: AuthDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          userName: auth.username,
        },
      });

      if (user) {
        const isValid = await bcrypt.compare(auth.password, user.password);
        return isValid;
      }
      return false;
    } catch {
      console.log('somethinfg wrong with log');
      return false;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 9;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
