import { setAxiosConfig } from '@ltpx-frontend-apps/api';
import { AppRouter } from './routes/app-router';

export function App() {
  const API_URL = process.env.NX_API_URL || '';
  const KEY_LOCAL_STORAGE = process.env.NX_KEY_LOCAL_STORAGE || '';
  setAxiosConfig(API_URL, KEY_LOCAL_STORAGE);

  return (
    <AppRouter />
  );
}

export default App;
