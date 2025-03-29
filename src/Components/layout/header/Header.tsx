import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/ActionType";
import "./Header.css"


export default function Header() {
  const navigate = useNavigate();
  const userLogin = useSelector((state: AppState) => state.userLogin);
  const dispatch = useDispatch();


  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value) {
      navigate(value);
    }
  }


  function logOut() {
    dispatch({ type: ActionType.logOut });
    navigate('/');
  }
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          {/* <img src="/logo.png" alt="Logo" /> */}
          <h1>CHOICE</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>

          {userLogin?.userType === "admin" && (
            <>
              <li>
                <select onChange={handleSelectChange} defaultValue="">
                  <option value="" disabled hidden>
                    Users
                  </option>
                  <option value="/allUsers">All Users</option>
                  <option value="/addUser">Add New User</option>
                </select>
              </li>

              <li>
                <select onChange={handleSelectChange} defaultValue="">
                  <option value="" disabled hidden>Companies</option>
                  <option value="/allCompanies">All Companies</option>
                  <option value="/addCompany">Add company</option>
                </select>
              </li>

              <li>
                <select onChange={handleSelectChange} defaultValue="">
                  <option value="" disabled hidden>Category</option>
                  <option value="/allCategories">All Categories</option>
                  <option value="/addCategory">Add category</option>
                </select>
              </li>
            </>
          )}


          {userLogin.token && userLogin.userType === "company" && (
            <> <li><Link to="/createCoupon">Create Coupon</Link></li>
              <li><Link to="/companyCouponsPage">Company page</Link></li></>

          )}

          {userLogin?.token && (
            <li><Link to="/myUser">My Profile</Link></li>
          )}

          {userLogin.token && userLogin.userType !== "company" && (
            <li><Link to="/purchases">Purchases</Link></li>
          )}


          {userLogin?.token ? (
            <li><Link to="/" onClick={logOut}>Log Out</Link></li>
          ) : (
            <>
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );


}





// return (
//   <div className="header">
//     <nav className="navbar">
//       <div className="navbar-first text">Designer Home Bargains</div>

//       <div className="navbar-logo"></div>
//       <ul className="navbar-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>


//         {userLogin.token && (
//           <li><Link to="/myUser" >myUser</Link></li>
//         )}

//         <li><Link to="/AllCompanies">Companies</Link></li>

//         <li><Link to="/AllCategory">Categories</Link></li>



//         {userLogin.userType === "admin" && (
//           <li><Link to="/allUsers">Users</Link></li>
//         )}

//         <li><Link to="/signup">Sing Up</Link></li>
//         {userLogin.token && userLogin.userType != "customer" && (
//           <li><Link to="/CreateAndUpdateCoupon">Add coupon</Link></li>
//         )}

//         {userLogin.token && userLogin.userType === "customer" && (
//           <li><Link to="/purchases">Purchases</Link></li>
//         )}

//         {userLogin.token && userLogin.userType === "company" && (
//           <li><Link to="/CreateAndUpdateCoupon">Create coupon</Link></li>
//         )}

//         {!userLogin.token && (
//           <>
//             <li><Link to="/login">Login</Link></li>
//           </>
//         )}


//         {userLogin.token && (
//           <li><Link to="/" onClick={logOut}>LogOut</Link></li>

//         )}


//       </ul>
//     </nav>
//   </div>
// );