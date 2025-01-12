import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../redux/AppState';
import { ActionType } from '../redux/ActionType';


export default function Header() {

    const dispatch = useDispatch(); // TODO more explanation 
    const navigate = useNavigate();
    const userLogin = useSelector((state: AppState) => state.userLogin);

    function logout() {
        dispatch({ type: ActionType.LogOut });
        alert("Good Buy!");
        navigate('/');


    }
    return (
        <header className='header'>
            <div className="logo">
                <img src="/logo.png" alt="Some Shop Logo" />
                <h1>Elegant Essentials - Transform Your Home, Save in Style</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li> <a href="/">Home</a></li>

                    {/* TODO what is a difference in using href vs Link?*/}

                    <li> <a href="/about">About</a></li>
                    {!userLogin.token && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">SignUp</Link></li>
                        </>
                    )}

                    {/* הצגת LogOut אם המשתמש מחובר */}
                    {userLogin.token && (
                        <li><Link to="/" onClick={logout}>LogOut</Link></li>
                    )}


                </ul>
            </nav>
        </header>
    )
}