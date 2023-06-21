import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  all() {
    return this.prismaService.asset.findMany();
  }

  create(data: { id: string; symbol: string; price: number }) {
    return this.prismaService.asset.create({
      data,
    });
  }
}
