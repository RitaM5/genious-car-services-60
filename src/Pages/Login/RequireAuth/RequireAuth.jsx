import React from 'react';
import { useLocation } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
const RequireAuth = ({children}) => {
    const [user] = useAuthState(auth);
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
      }
    
      return children;
    
};

export default RequireAuth;