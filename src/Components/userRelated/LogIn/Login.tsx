import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionType } from "../../../redux/ActionType";
import './Login.css';
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

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [username, setUserName] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function updateUserName(event: any): void {
    setUserName(event.target.value);
  }

  function updatePassword(event: any): void {
    setPassword(event.target.value);
  }

  async function login() {
    try {
      const response = await axios.post("http://localhost:8080/users/login", { username: username, password });
      const serverResponse = response.data;
      let token = 'Bearer ' + serverResponse;
      const cleanedToken = token.replace('Bearer ', '');
      axios.defaults.headers.common['Authorization'] = token;
      const decoded: any = jwtDecode(cleanedToken);

      const parsedSub = typeof decoded.sub === "string" ? JSON.parse(decoded.sub) : decoded.sub;
      const userId = parsedSub.id;
      const userType = parsedSub.userType;
      const companyId = parsedSub.companyId;

      dispatch({ type: ActionType.updateUserLogin, payload: { token, userId, userType, companyId } });
      console.log("Dispatched updateUserLogin:", { token, userId, userType, companyId });

      navigate('/');
    } catch (e) {
      console.error("Login error:", e);
      alert("Username or password are incorrect");
    }
  }

  return (
    <div className='login'>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login Modal"
        >
          <h1>Login</h1>
          <input type="email" placeholder="Username" onChange={updateUserName} />
          <br />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={updatePassword}
          />
          <br />

          {/* Centered "Show Password" Button */}
          <button className="show-password-btn" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <br />
          <button className="buttonLogin" onClick={login}>Login</button>
          <button className="buttonLogin" onClick={closeModal}>Close</button>
        </Modal>
        <button className="buttonOpenModal" onClick={openModal}>Open Login</button>
      </div>
    </div>
  );
}
