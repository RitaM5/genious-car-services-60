import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css';
import auth from '../../../firebase.init';
const Register = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    if(user){
        /*  navigate('/home'); */
        console.log('user', user);
     }
     
    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
     {  /*  const agree = event.target.terms.checked; */}
    
         await createUserWithEmailAndPassword(email, password);
         await updateProfile({ displayName: name});
         console.log('Updated profile');
         navigate('/home');
    }
    const navigateLogin = event => {
        navigate('/login');
    }

    return (
        <div className="register-form">
            <h2 style={{ textAlign: "center" }}>please register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="your name" id=""></input>
                <input type="email" name="email" placeholder="your email" id="" required></input>

                <input type="password" name="password" placeholder="your password" id="" required></input>
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms"></input>
                <label className={agree ? 'text-primary' : 'text-danger'} htmlFor="terms">Accept genius terms and conditions</label>

                <input disabled={!agree} type="submit" value="register" className="mt-2 btn btn-primary"></input>
            </form>
            <p>Already have an account ? <Link to="/login" className="text-danger pe-auto" onClick={navigateLogin}>Please Login</Link></p>
        </div>
    );
};

export default Register;