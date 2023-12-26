import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayPalModule } from './modules/paypal/paypal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    PayPalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
