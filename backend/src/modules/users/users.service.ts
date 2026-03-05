import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById({ id }: { id: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        profiles: true,
        bodyMeasurement: true,
      },
    });

    return user;
  }

  async getByEmail({ email }: { email: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
