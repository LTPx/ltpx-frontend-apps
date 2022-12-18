// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppRouter } from './routes/app-router';
import { UserProvider } from './store/context/user/user-provider';

export function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
