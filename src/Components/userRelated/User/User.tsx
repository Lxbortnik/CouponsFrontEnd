import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../modules/IUser";
import { AppState } from "../../../redux/AppState";
import axios from "axios";
import { ActionType } from "../../../redux/ActionType";
import "./User.css"
import { useState } from "react";

export default function User(props: IUser) {

    const userLogin = useSelector((state: AppState) => state.userLogin);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<IUser>(props);

    async function handleDelete() {
        const isConfirmed = window.confirm(`Are you sure you want to delete user with ID: ${props.id}?`);

        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:8080/users/deleteuserbyadmin/${props.id}`, {
                    headers: {
                        Authorization: userLogin.token,
                    },
                });

                alert(`User with ID: ${props.id} has been deleted.`);
                dispatch({
                    type: ActionType.deleteUserByAdmin,
                    payload: props.id
                });
            } catch (error) {
                alert(`Error deleting user with ID: ${props.id}`);
                console.error("Error details:", error);
            }
        } else {
            alert(`User with ID: ${props.id} was not deleted.`);
        }
    }

    async function handleUpdate() {
        try {
            const response = await axios.put(
                `http://localhost:8080/users/${props.id}`,
                editedUser,
                {
                    headers: {
                        Authorization: userLogin.token,
                    },
                }
            );

            alert(`User with ID: ${props.id} has been updated.`);
            dispatch({
                type: ActionType.updateUser,
                payload: response.data,
            });
            setIsEditing(false);
        } catch (error) {
            alert(`Error updating user with ID: ${props.id}`);
            console.error("Error details:", error);
        }
    }
    function toggleEdit() {
        setIsEditing(!isEditing);
        setEditedUser(props); // Reset to original props if cancelled
    }

    return (
        <tr className="User">
            <td>{props.id}</td>
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            value={editedUser.username}
                            onChange={(e) =>
                                setEditedUser({ ...editedUser, username: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            type="password"
                            value={editedUser.password}
                            onChange={(e) =>
                                setEditedUser({ ...editedUser, password: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <select
                            value={editedUser.userType}
                            onChange={(e) =>
                                setEditedUser({ ...editedUser, userType: e.target.value })
                            }
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editedUser.companyId ?? ""}
                            onChange={(e) =>
                                setEditedUser({ ...editedUser, companyId: e.target.value ? +e.target.value : null })
                            }
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{props.username}</td>
                    <td>{props.password}</td>
                    <td>{props.userType}</td>
                    <td>{props.companyId}</td>
                </>
            )}
            <td>
                {isEditing ? (
                    <>
                        <button className="save-btn" onClick={handleUpdate}>
                            Save
                        </button>
                        <button className="cancel-btn" onClick={toggleEdit}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="edit-btn" onClick={toggleEdit}>
                            Edit
                        </button>
                        <button className="delete-btn" onClick={handleDelete}>
                            Delete
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}