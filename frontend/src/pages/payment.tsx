import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { OnApproveData } from '@paypal/paypal-js';
import axios from 'axios';
// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// components
import { ApiRoutes, endpoints } from 'src/constants/api';

// ----------------------------------------------------------------------

export default function PagePayment() {
  const paymentAmount = 10;

  const createOrder = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoints[ApiRoutes.PAYPAL].createOrder}`, { amount: paymentAmount });
    return response.data.orderId;
  };

  const onApprove = async (data: OnApproveData) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoints[ApiRoutes.PAYPAL].captureOrder}`, { orderId: data.orderID });
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string }}>
      <Head>
        <title> Page Payment | Minimal UI</title>
      </Head>

      <Container>
        <Typography variant="h3" component="h1" paragraph>
          Payment
        </Typography>

        
        <Container maxWidth='sm'>
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            style={{
              layout: 'horizontal',
              color: "blue",
              shape: "rect",
              disableMaxWidth: true,
            }}
          />
        </Container>
      </Container>
    </PayPalScriptProvider>
  );
}
