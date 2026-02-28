import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

export const getGraphqlConfig = (
  configService: ConfigService,
): ApolloDriverConfig => ({
  autoSchemaFile: true,
  playground: configService.get('MODE') === 'development',
  context: ({ req, res }) => ({ req, res }),
  sortSchema: true,
});
