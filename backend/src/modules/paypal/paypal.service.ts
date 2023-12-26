import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { exceptionText } from '@/common/constants/exceptions';
import {
  amountValueRound,
  createOrderIntent,
  defaultCurrencyCode,
  paypalApiEndpoints,
} from './constants';

@Injectable()
export class PayPalService {
  constructor(private readonly configService: ConfigService) {}

  private apiUrl = this.configService.get<string>('PAYPAL_API_URL');

  async generateAccessToken(): Promise<string> {
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

    const auth = Buffer.from(clientId + ':' + clientSecret).toString('base64');
    const response = await axios.post(
      `${this.apiUrl}${paypalApiEndpoints.token}`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.access_token;
  }

  async getRequestHeaders() {
    const accessToken = await this.generateAccessToken();

    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  async createOrder(amount: number): Promise<string> {
    const response = await axios.post(
      `${this.apiUrl}${paypalApiEndpoints.createOrder}`,
      {
        intent: createOrderIntent,
        purchase_units: [
          {
            amount: {
              currency_code: defaultCurrencyCode,
              value: amount.toFixed(amountValueRound),
            },
          },
        ],
      },
      {
        ...(await this.getRequestHeaders()),
      },
    );

    return response.data.id;
  }

  async captureOrder(orderId: string): Promise<void> {
    try {
      await axios.post(
        `${this.apiUrl}${paypalApiEndpoints.captureOrder(orderId)}`,
        {},
        {
          ...(await this.getRequestHeaders()),
        },
      );
    } catch (error) {
      throw new BadRequestException(exceptionText.payment.unsuccessful);
    }
  }
}
