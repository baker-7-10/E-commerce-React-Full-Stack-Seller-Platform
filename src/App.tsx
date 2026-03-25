import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import SignUp from '@/page/auth/SignUp';
import Login from '@/page/auth/Login';
import useInitApp from '@/hooks/useInitApp';
import Loading from './ui/Loading';
import ProtectedRoutes from './AppLayout/ProtectedRoutes';

function App() {

  useInitApp()
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
      <Routes>
  {ProtectedRoutes}
  <Route path="SignUp" element={<SignUp />} />
  <Route path="LogIn" element={<Login />} />
</Routes>

      </Suspense>
    </BrowserRouter>
  );
}

export default App;
