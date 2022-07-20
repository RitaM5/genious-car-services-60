import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Register.css';
import auth from '../../../firebase.init';
const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const handleRegister = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserWithEmailAndPassword(email, password);
    }
    const navigateLogin = event => {
        navigate('/login');
    }
    if(user){
        navigate('/home');
    }
    return (
        <div className="register-form">
            <h2 style={{ textAlign: "center" }}>please register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="your name" id=""></input>
                <input type="email" name="email" placeholder="your email" id="" required></input>

                <input type="password" name="password" placeholder="your password" id="" required></input>

                <input type="submit" value="register"></input>
            </form>
            <p>Already have an account ? <Link to="/login" className="text-danger pe-auto" onClick={navigateLogin}>Please Login</Link></p>
        </div>
    );
};

export default Register;