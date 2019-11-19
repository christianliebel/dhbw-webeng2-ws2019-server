import { Controller, Get, Param, Post, ConflictException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('greet')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getHello(@Param('name') name): string {
    return `Hallo ${name}!`;
  }

  @Post(':name')
  postHello(@Param('name') name) {
    throw new ConflictException();
  }
}
