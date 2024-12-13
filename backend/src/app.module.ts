import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
