import { Module } from '@nestjs/common';
import { AppController } from 'src/infrastructure/nestjs/app.controller';
import { AppService } from 'src/infrastructure/nestjs/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
