import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

export default function Register() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userType = 'customer';

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>  // TODO do not understand this function at all
        (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);

    const registerBtn = async () => {
        try {
            const user = { username, password };
            const response = await axios.post('http://localhost:8080/customers', { name, address, phone, user });
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            console.log(response.data);
        } catch (e) {
            console.error(e);
            setErrorMessage('Error: Could not register.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <p>Exclusive Savings, Exceptional Style</p>
            <input type="text" placeholder="Add your Email" onChange={handleChange(setUserName)} />
            <input type="password" placeholder="Add your Password" onChange={handleChange(setPassword)} />
            <input type="text" placeholder="Enter your Name" onChange={handleChange(setName)} />
            <input type="text" placeholder="Enter your Address" onChange={handleChange(setAddress)} />
            <input type="text" placeholder="Enter your Phone" onChange={handleChange(setPhone)} />
            <button type="button" onClick={registerBtn}>Register</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}