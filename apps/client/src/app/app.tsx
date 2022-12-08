// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';

import ApplicationRoutes from './routes/routes';

export function App() {
  return (
    <ApplicationRoutes />
  );
}

export default App;
