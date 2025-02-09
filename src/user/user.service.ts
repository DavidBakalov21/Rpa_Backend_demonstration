import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        createdQuotes: true,
        likedQuotes: true,
      },
    });

    return {
      users,
    };
  }
}
