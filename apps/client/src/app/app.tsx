// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppRouter } from './routes/app-router';
import { BrowserRouter } from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
