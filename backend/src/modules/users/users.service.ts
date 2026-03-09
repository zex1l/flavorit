import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserInput } from './inputs/user.input';
import { USER_UPDATE_ERROR, USER_WITH_SAME_EMAIL } from './user.constants';
import { Prisma } from 'prisma/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById({ id }: { id: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
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

  async updateProfile({ data, id }: { id: string; data: UpdateUserInput }) {
    const { profile, measurment, email } = data;

    const updateData: Prisma.UserUpdateInput = {};

    if (email) {
      const userWithSameEmail = await this.getByEmail({ email });

      if (userWithSameEmail)
        throw new BadRequestException(USER_WITH_SAME_EMAIL);

      updateData.email = email;
    }

    if (profile) {
      updateData.profile = {
        upsert: {
          create: profile,
          update: profile,
        },
      };
    }

    if (measurment) {
      updateData.bodyMeasurement = {
        upsert: {
          create: measurment,
          update: measurment,
        },
      };
    }

    try {
      const user = await this.prismaService.user.update({
        where: {
          id,
        },
        data: updateData,
        include: {
          bodyMeasurement: true,
          profile: true,
        },
      });

      return user;
    } catch (err) {
      throw new BadRequestException(USER_UPDATE_ERROR + err);
    }
  }
}
