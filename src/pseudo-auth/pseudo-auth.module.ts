import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './pseudo-auth.controller';
import { AuthService } from './pseudo-auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class PseudoAuthModule {}
