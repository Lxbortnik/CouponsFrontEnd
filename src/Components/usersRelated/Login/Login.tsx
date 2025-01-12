
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css'

// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { ActionType } from '../redux/ActionType';

// export default function Login() {
//   const [username, setUsername] = useState<string>(""); // TODO why im adding word string to useState?
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   let [showPassword, setShowPassword] = useState<boolean>(false);

//   const onUsernameChange = (event: any) => {
//     setUsername(event.target.value);
//   };

//   const onPasswordChange = (event: any) => {
//     setPassword(event.target.value);
//   };


//   async function login() {

//     try {
//       debugger;
//       const response = await axios.post("http://localhost:8080/users/login", { username: username, password });
//       const serverResponse = response.data;
//       let token = 'Bearer ' + serverResponse;

//       const cleanedToken = token.replace('Bearer ', ''); // cleaning "Bearer"
//       axios.defaults.headers.common['Authorization'] = token; // TODO ask Avi if axios have memory space(that saving token in it)
//       const decoded: any = jwtDecode(cleanedToken);
//       const parsedSub = JSON.parse(decoded.sub);
//       const userId = parsedSub.userId;
//       const userType = parsedSub.userType;
//       const companyId = parsedSub.companyId;

//       // I write the userLogin in the store
//       dispatch({ type: ActionType.updateUserLogin, payload: { token,userId,userType,companyId}}); //TODO explain to someone ones again

//       navigate('/');
//       console.log (serverResponse);
//     }
//     catch (e) {
//       alert("We were unable to connect to the system with the provided username and password");
//     }

//   }
//   // async function onLoginClicked() {
//   //   try {
//   //     const response = await axios.post("http://localhost:8080/users/login", { username, password });
//   //     const serverResponse = response.data
//   //     console.log(serverResponse)
//   //   }
//   //   catch (e) {
//   //     console.error('Login failed', e)
//   //   }
//   // };

//   return (
//     //TODO need further explanation 
//     <div>
//       <div className="main-content">
//         <div className="login-container">
//           <h2>Prestige Perks</h2>
//           <p>Exclusive Savings, Exceptional Style</p>
//           <label>Username</label>
//           <input type="text" value={username} placeholder="Username" onChange={onUsernameChange} />
//           <label>Password</label>
//           <input type="password" value={password} placeholder="Password" onChange={onPasswordChange} />
//           <input type="submit" value="Login" onClick={login} />
//           <p><a href="#">Forgot your password? Reset it here</a></p>
//           <footer className="footer">© 2024 Alex Bortnik</footer>
//         </div>
//       </div>
//     </div>
//   );

// }


// function jwtDecode(cleanedToken: string): any {
//   throw new Error('Function not implemented.');
// }



import axios from "axios";
import React, { useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [username, setUserName] = useState<string>("");
  let [password, setPassword] = useState<string>("");
  let [showPassword, setShowPassword] = useState<boolean>(false);

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
      const cleanedToken = token.replace('Bearer ', ''); // Remove "Bearer "
      axios.defaults.headers.common['Authorization'] = token;
      const decoded: any = jwtDecode(cleanedToken);  // Decode the JWT token

      const parsedSub = typeof decoded.sub === "string" ? JSON.parse(decoded.sub) : decoded.sub; // TODO need more explanation 

      const userId = parsedSub.id; // TODO need more explanation for the next 3
      const userType = parsedSub.userType;
      const companyId = parsedSub.companyId;

      // Update the Redux store with user login details
      dispatch({ type: ActionType.UpdateUserLogin, payload: { token, userId, userType, companyId } });
      console.log("Dispatched updateUserLogin:", { token, userId, userType, companyId });
      // Navigate to the home page
      navigate('/');
    }


    catch (e) {
      console.error("Login error:", e);
      alert("Username or password are incorrect");
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <input type='email' placeholder='username' onChange={updateUserName} />
      <br />
      <input type={showPassword ? "text" : "password"} placeholder='password' onChange={updatePassword} />
      <br />
      <button className='buttonLogin' onClick={login}>login</button>
    </div>
  );
}

