import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PayPalService } from './paypal.service';
import { PayPalController } from './paypal.controller';

@Module({
  providers: [PayPalService],
  controllers: [PayPalController],
  exports: [PayPalService],
  imports: [ConfigModule],
})
export class PayPalModule {}
