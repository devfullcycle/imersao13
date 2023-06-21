import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
