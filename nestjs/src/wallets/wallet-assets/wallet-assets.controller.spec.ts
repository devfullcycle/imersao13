import { Test, TestingModule } from '@nestjs/testing';
import { WalletAssetsController } from './wallet-assets.controller';

describe('WalletAssetsController', () => {
  let controller: WalletAssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAssetsController],
    }).compile();

    controller = module.get<WalletAssetsController>(WalletAssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
