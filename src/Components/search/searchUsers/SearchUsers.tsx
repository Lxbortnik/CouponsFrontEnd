import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/ActionType";
import './SearchUsers.css'

export default function SearchUsers() {
    const dispatch = useDispatch();
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const [selectedUserType, setSelectedUserType] = useState("");

    const companiesFromDB = useSelector((state: AppState) => state.companies);
    const userTypes = ["admin", "company", "customer"];

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userId = event.target.value;
        setSelectedUserId(userId);
        dispatch({ type: ActionType.updateUsersFilter, payload: userId });
    };

    const handleCompanyIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const companyId = event.target.value;
        setSelectedCompanyId(companyId);
        dispatch({ type: ActionType.updateCompanyFilter, payload: companyId });
    };

    const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userType = event.target.value;
        setSelectedUserType(userType);
        dispatch({ type: ActionType.updateTypeFilter, payload: userType }); // ✅ Dispatch userType to Redux
    };

    return (
        <div className="search-bar">
            {/* <label htmlFor="userFilter">Enter User ID:</label> */}
            <div className="search-container">
                <input
                    type="text"
                    id="userFilter"
                    placeholder="Search for a User by ID"
                    value={selectedUserId}
                    onChange={handleUserIdChange}
                />
            </div>
            <div className="search-filter">
                <select id="companyFilter" value={selectedCompanyId} onChange={handleCompanyIdChange}>
                    <option value="">All Companies</option>
                    {companiesFromDB.map((company) => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                </select>
                <select id="userTypeFilter" value={selectedUserType} onChange={handleUserTypeChange}>
                    <option value="">All User Types</option>
                    {userTypes.map((userType) => (
                        <option key={userType} value={userType}>{userType}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}