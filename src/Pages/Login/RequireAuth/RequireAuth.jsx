import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!user.emailVerified) {
    return <div>
      <h3 className="text-danger">your email is not varified</h3>
      <h5>please verify your email address</h5>
      <button
      className="btn btn-primary"
        onClick={async () => {
          await sendEmailVerification();
          toast('Sent email');
        }}
      >
        send Verification email again
      </button>
      <ToastContainer></ToastContainer>
    </div>
  }

  return children;

};

export default RequireAuth;