import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
  @ApiProperty({ description: 'password of the person' })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({ description: 'Username of the person' })
  @IsNotEmpty()
  @IsString()
  username: string;
}
