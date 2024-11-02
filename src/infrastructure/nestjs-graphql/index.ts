import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Config } from 'src/infrastructure/common/config';
import { TaskResolver } from 'src/infrastructure/nestjs-graphql/resolvers/task.resolver';

export const defineGraphQlModule = () => {
  return GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    buildSchemaOptions: {
      dateScalarMode: 'timestamp',
    },
    autoSchemaFile: join(
      Config.rootPath,
      'src/infrastructure/graphql/schema/schema.gql',
    ),
    sortSchema: true,
  });
};

export const defineResolvers = () => {
  return [TaskResolver];
};
