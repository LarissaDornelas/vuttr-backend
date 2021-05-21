import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ToolModule } from './tool/tool.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
    }),
    ToolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
