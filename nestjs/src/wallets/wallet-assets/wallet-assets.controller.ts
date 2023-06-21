import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletAssetsService } from './wallet-assets.service';

// /wallets/

@Controller('wallets/:wallet_id/assets')
export class WalletAssetsController {
  constructor(private walletAssetsService: WalletAssetsService) {}

  @Get()
  all(@Param('wallet_id') wallet_id: string) {
    return this.walletAssetsService.all({ wallet_id });
  }

  @Post()
  create(
    @Param('wallet_id') wallet_id: string,
    @Body() body: { asset_id: string; shares: number },
  ) {
    return this.walletAssetsService.create({
      wallet_id,
      ...body,
    });
  }
}
