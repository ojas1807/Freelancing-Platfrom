import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    // Redirect to home if not authenticated
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;