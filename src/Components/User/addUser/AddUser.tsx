import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionType } from "../../../redux/ActionType";
import './AddUser.css'

export default function AddUser() {
    const dispatch = useDispatch();
    let [companyId, setCompanyId] = useState<number | null>(null);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [userType, setUserType] = useState("admin");
    const userLgin = useSelector((state: AppState) => state.userLogin);
    const companies = useSelector((state: AppState) => state.companies);
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(true);

    function updateCompanyId(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setCompanyId(value ? +value : null);
    }

    function updateUsername(event: React.ChangeEvent<HTMLInputElement>): void {
        setUsername(event.target.value);
    }

    function updatePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(event.target.value);
    }

    async function createNewUser() {
        try {
            //debugger;
            const userEntity = await axios.post(
                "http://localhost:8080/users/byadmin",
                { username, password, userType, companyId },
                {
                    headers: { Authorization: userLgin.token },
                }
            );
            //debugger;

            dispatch({
                type: ActionType.createUserByAdmin,
                payload: {
                    id: userEntity.data.id,
                    username: userEntity.data.username,
                    password: userEntity.data.password,
                    userType: userEntity.data.userType,
                    companyId: userEntity.data.companyId
                }
            });
            alert("Registration completed successfully");
            closeModal();
        } catch (e) {
            console.error(e);
            alert("I couldn't complete the registration");
        }
    }

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        navigate("/");
    }

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="add-user-content">
                        <h1>New User</h1>
                        <input
                            type="email"
                            placeholder="userName"
                            onChange={updateUsername}
                            value={username}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="password"
                            onChange={updatePassword}
                            value={password}
                        />
                        <br />
                        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        
                            <option value="admin">Admin</option>
                            <option value="company">Company</option>
                        </select>
                        <br />

                        {userType === "company" && (
                            <select value={companyId || ""} onChange={(e) => setCompanyId(Number(e.target.value))}>
                                <option value="">Select a company</option>
                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <br />
                        <button onClick={createNewUser}>Create</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}
