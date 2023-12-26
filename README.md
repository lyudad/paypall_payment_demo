# PayPal Integration Demo

This repository provides a simple integration with PayPal for handling payments on the frontend using the "@paypal/react-paypal-js" library and corresponding backend REST API endpoints.

### Retrieving PayPal API Credentials

To integrate PayPal into your application, you'll need to retrieve your PayPal API credentials. Follow these steps to obtain your Client ID:

- **Visit the PayPal Developer Website:**
Go to the [PayPal Developer website](https://developer.paypal.com/).

- **Sign In:**
Log in to your existing PayPal Developer account.

- **Navigate to the Dashboard:**
Once logged in, navigate to the [Sandbox Accounts](https://developer.paypal.com/dashboard/accounts) (Testing Tools -> Sandbox Accounts).

- **Choose Business Account:**
Within the "Sandbox Accounts" section, choose or create a business account. This account will represent your business in the PayPal sandbox environment.

- **Retrieve Client ID and Secret:**
Once you've selected the business account, find the "API credentials" or similar section. Copy both the **Client ID** and **Secret**. It's crucial to keep the secret secure and not expose it on the client side.

## Frontend Integration

```javascript I'm A tab
// Import necessary modules
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Set up PayPalScriptProvider with your credentials
<PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
  {/* Add PayPalButtons where you want to display the payment form */}
  <PayPalButtons 
    createOrder={(data, actions) => {/* Implement logic to create order */}}
    onApprove={(data, actions) => {/* Implement logic to capture order */}}
  />
</PayPalScriptProvider>
```

## Backend Integration

Create Order Endpoint
- Path: `/create-order`
- Method: `POST`
- Description: Initiates the creation of a PayPal order and returns the order ID to the frontend.

Capture Order Endpoint
- Path: `/capture-order`
- Method: `POST`
- Description: Invoked after the user completes the payment on the PayPal window. If successful, returns a status code of 201; otherwise, returns a status code of 4xx for unsuccessful payments.
