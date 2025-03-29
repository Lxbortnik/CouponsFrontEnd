import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AppState } from '../../../redux/AppState';
import { ICompany } from '../../../modules/ICompany';
import { ActionType } from '../../../redux/ActionType';


function Company(props: ICompany) {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);

    // State for managing edit mode and input values
    const [isEditing, setIsEditing] = useState(false);
    const [editedCompany, setEditedCompany] = useState({
        id:props.id,
        name: props.name,
        address: props.address,
        phone: props.phone,
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {

            const token = userLogin.token;
            if (!token) {
                alert("User is not logged in!");
                return;
            }

//debugger;
           await axios.put(
                "http://localhost:8080/companies", 
                editedCompany , // Merge the original company with edited fields
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            // Update the store after successful save
            dispatch({
                type: ActionType.updateCompany,
                payload: editedCompany
            });

            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating company:", error);
            alert("Error saving changes.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCompany((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${props.name}?`)) {
            try {
                await axios.delete(`http://localhost:8080/companies/${props.id}`);

                dispatch({
                    type: ActionType.deleteCompany,
                    payload: props.id,
                });
            } catch (error) {
                console.error("Error deleting company:", error);
                alert("Error deleting company.");
            }
        }
    };

    return (
        <tr className="company-card">
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            name="name"
                            value={editedCompany.name}
                            onChange={handleInputChange}
                            placeholder="Company Name"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="address"
                            value={editedCompany.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="phone"
                            value={editedCompany.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                        />
                    </td>
                    <td>
                        <div className="company-actions">
                            <button className="save-btn" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </td>
                </>
            ) : (
                <>
                    <td>
                        <span className="company-name">{props.name}</span>
                    </td>
                    <td>
                        <p className="company-address">Address: {props.address}</p>
                    </td>
                    <td>
                        <p className="company-phone">Phone: {props.phone}</p>
                    </td>
                    <td>
                        {userLogin?.userType === "admin" && (
                            <div className="company-actions">
                                <button
                                    className="edit-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditToggle();
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete();
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </td>
                </>
            )}
        </tr>
    );
}

export default Company;
