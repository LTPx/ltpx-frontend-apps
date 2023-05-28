import { setAxiosConfig } from '@ltpx-frontend-apps/api';
import { AppRouter } from './routes/app-router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';

export function App() {
  const PAYPAL_ID = process.env.NX_PAYPAL_ID_CLIENT || '';
  const API_URL = process.env.NX_API_URL || '';
  const KEY_LOCAL_STORAGE = process.env.NX_KEY_LOCAL_STORAGE || '';
  console.log('API_URL: ', API_URL);
  setAxiosConfig(API_URL, KEY_LOCAL_STORAGE);

  const createInstance = () => {
    const auth_token = localStorage.getItem(KEY_LOCAL_STORAGE);
    if (auth_token) {
      axios.defaults.headers.common["Authorization"] = auth_token;
    }
    return axios.create({ baseURL: API_URL });
  }

  createInstance();

  return (
    <PayPalScriptProvider
      options={{ 'client-id': PAYPAL_ID, currency: 'USD', locale: 'es_EC' }}
    >
      <AppRouter />
    </PayPalScriptProvider>
  );
}

export default App;
