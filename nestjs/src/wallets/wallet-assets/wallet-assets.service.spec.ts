import { Test, TestingModule } from '@nestjs/testing';
import { WalletAssetsService } from './wallet-assets.service';

describe('WalletAssetsService', () => {
  let service: WalletAssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletAssetsService],
    }).compile();

    service = module.get<WalletAssetsService>(WalletAssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
