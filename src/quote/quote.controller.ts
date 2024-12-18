import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { QuoteCreateDto, QuoteDeleteDto, QuoteEditDto } from './dto/quote.dto';
import { QuoteService } from './quote.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Quotes')
@Controller('quote')
export class QouteController {
  constructor(private quoteServ: QuoteService) {}

  @Post('create')
  async createQuote(@Body() createDto: QuoteCreateDto, @Res() res: Response) {
    const create = await this.quoteServ.CreateQuote(createDto);
    res.json({ create });
  }

  @Delete('delete')
  async deleteQuote(@Body() delDto: QuoteDeleteDto, @Res() res: Response) {
    const del = await this.quoteServ.DeleteQuote(delDto);
    res.json({ del });
  }

  @Put('edit')
  async edit(@Body() editDto: QuoteEditDto, @Res() res: Response) {
    const edit = await this.quoteServ.EditQuote(editDto);
    res.json({ edit });
  }

  @Get('getAllQuotesPaginated')
  async getQuotesPaginated(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const objects = await this.quoteServ.getPaginatedQuotes(page, limit);
    res.json({ objects });
  }
  @Get('getAllQuotes')
  async getQuotes(@Res() res: Response) {
    const objects = await this.quoteServ.getAllQuotes();
    res.json({ objects });
  }
  @Get('getUserQuotes')
  async getUserQuotes(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('user') user: string,
    @Res() res: Response,
  ) {
    const objects = await this.quoteServ.getPaginatedQuotesForUsers(
      page,
      limit,
      user,
    );
    res.json({ objects });
  }
}
