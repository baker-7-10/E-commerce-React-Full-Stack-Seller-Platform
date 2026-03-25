import { useEffect } from 'react';
import useUser from '../hooks/useUser';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '@/ui/Spinner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  if (isLoading) return <Spinner />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
