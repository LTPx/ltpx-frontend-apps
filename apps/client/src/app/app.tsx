// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppRouter } from './routes/app-router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export function App() {
  const PAYPAL_ID = process.env.NX_PAYPAL_ID_CLIENT || '';
  return (
    <AppRouter />
  );
  // return (
  //   <PayPalScriptProvider
  //     options={{ 'client-id': PAYPAL_ID, currency: 'USD', locale: 'es_EC' }}
  //   >
  //     <AppRouter />
  //   </PayPalScriptProvider>
  // );
}

export default App;
