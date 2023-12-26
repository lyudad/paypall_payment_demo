export const defaultCurrencyCode = 'USD';
export const createOrderIntent = 'CAPTURE';
export const amountValueRound = 2;

export const paypalApiEndpoints = {
  token: '/v1/oauth2/token',
  createOrder: '/v2/checkout/orders',
  captureOrder: (orderId: string) => `/v2/checkout/orders/${orderId}/capture`,
};
