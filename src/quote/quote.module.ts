import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QouteController } from './quote.controller';
import { QuoteService } from './quote.service';

@Module({
  imports: [PrismaModule],
  controllers: [QouteController],
  providers: [QuoteService],
})
export class QuoteModule {}
