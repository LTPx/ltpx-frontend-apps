// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { AppRouter } from './routes/app-router';
import { BrowserRouter } from 'react-router-dom';
import ApplicationRoutes from './routes/routes';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      {/* <ApplicationRoutes /> */}
    </BrowserRouter>
  );
}

export default App;
