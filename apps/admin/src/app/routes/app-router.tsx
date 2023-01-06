import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/app-layout/app-layout';
import Login from '../pages/login/login';
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
