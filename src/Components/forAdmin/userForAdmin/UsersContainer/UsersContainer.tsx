import { useSelector } from "react-redux";
import { AppState } from "../../../../redux/AppState";
import User from "../../../userRelated/User/User";
import "./UsersContainer.css"
import { IUser } from "../../../../modules/IUser";
import SearchUsers from "../../../search/searchUsers/SearchUsers";


export default function UsersContainer() {
    const usersModel = useSelector((state: AppState) => state.users);

    return (
        <div className="UsersContainer">
            <SearchUsers />
            <div className="UsersTableWrapper">
                <table>
                    <thead>
                        <tr>
                            <td>User ID</td>
                            <td>Email</td>
                            <td></td>
                            <td>Type</td>
                            <td>Company ID</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {usersModel.map((user) => (
                            <User
                                key={user.id}
                                id={user.id}
                                username={user.username}
                                password={user.password}
                                userType={user.userType}
                                companyId={user.companyId}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
