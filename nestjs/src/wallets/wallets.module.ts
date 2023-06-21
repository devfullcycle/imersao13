import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletAssetsService } from './wallet-assets/wallet-assets.service';
import { WalletAssetsController } from './wallet-assets/wallet-assets.controller';

@Module({
  controllers: [WalletsController, WalletAssetsController],
  providers: [WalletsService, WalletAssetsService],
})
export class WalletsModule {}
