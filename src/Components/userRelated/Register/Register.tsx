import axios from "axios";
import { useState } from "react";
import './Register.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px', // Ensures proper width
        maxWidth: '90%',
    },
}; 

Modal.setAppElement('#root');

export default function Register() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userType = 'customer';
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Function to handle input updates
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
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
            setErrorMessage('Error: Username already exist');
            setSuccessMessage('');
        }
    };

    return (
        <div className="signup-container">
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Register Modal"
                >
                    <h1>Sign Up</h1>
                    <p className="subtitle">Exclusive Savings, Exceptional Style</p>

                    <input type="text" placeholder="Add your Email" onChange={handleChange(setUserName)} />
                    <input type="password" placeholder="Add your Password" onChange={handleChange(setPassword)} />
                    <input type="text" placeholder="Enter your Name" onChange={handleChange(setName)} />
                    <input type="text" placeholder="Enter your Address" onChange={handleChange(setAddress)} />
                    <input type="text" placeholder="Enter your Phone" onChange={handleChange(setPhone)} />

                    <button type="button" className="buttonRegister" onClick={registerBtn}>Register</button>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <button className="buttonClose" onClick={closeModal}>Close</button>
                </Modal>

                <button className="buttonOpenModal" onClick={openModal}>Open Register</button>
            </div>
        </div>
    );
}
