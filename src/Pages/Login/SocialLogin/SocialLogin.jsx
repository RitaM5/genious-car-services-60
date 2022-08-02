import React from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let errorElement;
    if (error || error1) {
        errorElement =<p style={{ color: 'red' }}>Error: {error?.message} {error1?.message}</p>

    }

    if (user || user1) {
        navigate('/home');
    }
    if(loading || loading1){
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="d-flex align-items-center">
                <div style={{ height: '1px' }} className="bg-primary w-50"></div>
                <p className="mt-2 px-2">or</p>
                <div style={{ height: '1px' }} className="bg-primary w-50"></div>
            </div>
            <div>
                {errorElement}
                <button onClick={() => signInWithGoogle()} className="btn btn-primary w-50 d-block mx-auto my-2"><img style={{ width: '24px' }} src="https://img.icons8.com/color/48/000000/google-logo.png" /> Google Sign In</button>
                <button className="btn btn-primary w-50 d-block mx-auto my-2"><img style={{ width: '28px' }} src="https://img.icons8.com/color/48/000000/facebook-circled--v1.png" /><span className="ms-1">Facebook Sign In</span></button>
                <button onClick={() => signInWithGithub()} className="btn btn-primary w-50 d-block mx-auto"><img style={{ width: '24px' }} src="https://img.icons8.com/ios-filled/50/000000/github.png" /><span className="ms-1">Github Sign In</span></button>
            </div>
        </div>
    );
};

export default SocialLogin;