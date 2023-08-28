import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.' + process.env.NODE_ENV,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    RoomsModule,
    UsersModule,
  ],
})
export class AppModule {}
