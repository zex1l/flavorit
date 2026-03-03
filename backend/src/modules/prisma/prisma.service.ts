import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined');
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter, log: ['error', 'warn'] });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
    await this.$queryRaw`SELECT 1`
    console.log('Connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
    console.log('Disconnected to database');
  }
}
