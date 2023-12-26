import { Controller, Post, Body } from '@nestjs/common';
import { PayPalService } from './paypal.service';

@Controller('paypal')
export class PayPalController {
  constructor(private readonly paypalService: PayPalService) {}

  @Post('create-order')
  async createOrder(
    @Body('amount') amount: number,
  ): Promise<{ orderId: string }> {
    const orderId = await this.paypalService.createOrder(amount);
    return { orderId };
  }

  @Post('capture-order')
  async captureOrder(@Body('orderId') orderId: string): Promise<void> {
    await this.paypalService.captureOrder(orderId);
  }
}
