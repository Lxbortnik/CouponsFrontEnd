import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ICategory } from '../../../modules/ICategory';
import { AppState } from '../../../redux/AppState';
import { ActionType } from '../../../redux/ActionType';


export default function Category(props: ICategory) {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);

    // State for managing edit mode and input values
    const [isEditing, setIsEditing] = useState(false);
    const [editedCategory, setEditedCategory] = useState({
        id: props.id,
        category: props.category,
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

            await axios.put(
                "http://localhost:8080/categories",
                editedCategory,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

             //Update the store after successful save
            dispatch({
                type: ActionType.updateCategory,
                payload: editedCategory
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating category:", error);
            alert("Error saving changes.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${props.category}?`)) {
            try {
                await axios.delete(`http://localhost:8080/categories/${props.id}`);

                 dispatch({
                     type: ActionType.deleteCategory,
                     payload: props.id,
                 });

                 
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Error deleting category.");
            }
        }
    };

    return (
        <>
            {isEditing ? (
                <tr className="category-edit-mode">
                    <td>
                        <input
                            type="text"
                            name="category"
                            value={editedCategory.category}
                            onChange={handleInputChange}
                            placeholder="Category Name"
                        />
                    </td>
                    <td className="category-actions">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </td>
                </tr>
            ) : (
                <tr className="category-details">
                    <td>{props.category}</td>
                    {userLogin?.userType === "admin" && (
                        <td className="category-actions">
                            <button className="edit-btn" onClick={handleEditToggle}>Edit</button>
                            <button className="delete-btn" onClick={handleDelete}>Delete</button>
                        </td>
                    )}
                </tr>
            )}
        </>
    );
}

