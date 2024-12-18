import { Injectable, Res } from '@nestjs/common';
import { QuoteCreateDto, QuoteDeleteDto, QuoteEditDto } from './dto/quote.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuoteService {
  constructor(private prisma: PrismaService) {}
  async CreateQuote(createDto: QuoteCreateDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userName: createDto.username,
      },
    });

    if (!user) {
      return;
    }
    const newQuote = await this.prisma.quote.create({
      data: {
        text: createDto.text,
        author: createDto.username,
        genre: createDto.genre,
        creatorId: user.id,
      },
    });
    return newQuote;
  }

  async EditQuote(edit: QuoteEditDto) {
    const { id, username, text, genre } = edit;

    const existingQuote = await this.prisma.quote.findUnique({
      where: { id },
      include: {
        creator: true,
      },
    });

    if (!existingQuote) {
      return;
    }

    if (!existingQuote.creator || existingQuote.creator.userName !== username) {
      return;
    }

    const updatedQuote = await this.prisma.quote.update({
      where: { id },
      data: {
        text,
        genre,
      },
    });

    return updatedQuote;
  }

  async DeleteQuote(del: QuoteDeleteDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userName: del.username,
      },
    });
    if (!user) {
      return;
    }
    const quote = await this.prisma.quote.findUnique({
      where: {
        id: del.id,
      },
      include: {
        creator: true,
      },
    });
    if (quote.creatorId !== user.id) {
      return;
    }
    await this.prisma.quote.delete({
      where: {
        id: del.id,
      },
    });
  }
  async getPaginatedQuotes(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;

    const total = await this.prisma.quote.count();
    const totalPages = Math.ceil(total / pageSize);
    const quotes = await this.prisma.quote.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        creationDate: 'desc',
      },
      include: {
        creator: true,
      },
    });

    return {
      quotes,
      totalPages,
    };
  }
  async getPaginatedQuotesForUsers(
    page: number = 1,
    pageSize: number = 10,
    username: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        userName: username,
      },
    });
    if (!user) {
      return;
    }
    const offset = (page - 1) * pageSize;

    const total = await this.prisma.quote.count({
      where: {
        creatorId: user.id,
      },
    });
    const totalPages = Math.ceil(total / pageSize);

    const quotes = await this.prisma.quote.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        creationDate: 'desc',
      },
      include: {
        creator: true,
      },
      where: {
        creatorId: user.id,
      },
    });
    return {
      quotes,
      totalPages,
    };
  }

  async getAllQuotes() {
    const quotes = await this.prisma.quote.findMany({
      orderBy: {
        creationDate: 'desc',
      },
      include: {
        creator: true,
      },
    });

    return {
      quotes,
    };
  }
}
