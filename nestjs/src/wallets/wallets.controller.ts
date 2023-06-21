import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  all() {
    return this.walletsService.all();
  }

  @Post()
  create(@Body() body: { id: string }) {
    return this.walletsService.create({
      id: body.id,
    });
  }
}
