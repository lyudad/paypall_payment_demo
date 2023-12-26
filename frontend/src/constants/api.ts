export enum ApiRoutes {
  PAYPAL = '/paypal',
}

export const endpoints = {
  [ApiRoutes.PAYPAL]: {
    createOrder: `${ApiRoutes.PAYPAL}/create-order`,
    captureOrder: `${ApiRoutes.PAYPAL}/capture-order`,
  }
}