import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { IGqlContext } from 'src/shared/types/type';

export const getGraphqlConfig = (
  configService: ConfigService,
): ApolloDriverConfig => ({
  autoSchemaFile: true,
  playground: configService.get('MODE') === 'development',
  context: ({ req, res }: IGqlContext) => ({ req, res }),
  sortSchema: true,
});
