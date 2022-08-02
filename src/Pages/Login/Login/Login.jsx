import React from 'react';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import {useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/home";
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }
    if (user) {
        navigate(from, {replace: true});
    }
    if (error) {
        errorElement =<p style={{ color: 'red' }}>Error: {error?.message}</p>

    }
    const navigateRegister = event => {
        navigate('/register');
     
    }
    const resetPassword = async() =>{
        const email = emailRef.current.value;
        if(email){
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else{
        toast('please inter your email address')
        }
    }
    return (
        <div className="container w-50 mx-auto">
            <h2 className="text-primary text-center mt-2">please login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  ref={emailRef}placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button className="d-block mx-auto w-50" variant="primary" type="submit">
                   Login
                </Button>
            </Form>
            {errorElement}
            <p>New to Genius Car ? <Link to="/register" className="text-danger pe-auto" onClick={navigateRegister}>Please Register</Link></p>
            <p>Forget Password ? <button className="text-primary pe-auto btn btn-link" onClick={resetPassword}>Reset Password</button></p>
            <ToastContainer />
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;

