import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuoteCreateDto {
  @ApiProperty({ description: 'Username of the person creating the quote' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Text content of the quote' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ description: 'Genre of the quote' })
  @IsNotEmpty()
  @IsString()
  genre: string;
}

export class QuoteEditDto {
  @ApiProperty({ description: 'Unique identifier of the quote' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Username of the person editing the quote' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Updated text content of the quote' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ description: 'Updated genre of the quote' })
  @IsNotEmpty()
  @IsString()
  genre: string;
}

export class QuoteDeleteDto {
  @ApiProperty({
    description: 'Username of the person requesting the deletion',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Unique identifier of the quote to be deleted' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
