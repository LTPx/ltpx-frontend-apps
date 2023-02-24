import { useUser } from '@ltpx-frontend-apps/store';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutesTeacher = ({ children }: {children?: any}) => {
  const { isAuthenticated, isTeacher } = useUser();
  if (!isAuthenticated && !isTeacher) {
    // console.log('need authentication');
    return <Navigate to="/" replace />;
  }
  return children;
};

