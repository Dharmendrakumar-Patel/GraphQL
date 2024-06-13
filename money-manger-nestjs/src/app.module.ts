import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
      ConfigModule.forRoot({isGlobal: true}), 
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
      }),
      DatabaseModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
