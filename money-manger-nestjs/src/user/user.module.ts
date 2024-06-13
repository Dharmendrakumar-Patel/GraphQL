import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './graphql/user.reslover';

@Module({
  controllers: [],
  providers: [UserService, UserResolver]
})
export class UserModule {}
