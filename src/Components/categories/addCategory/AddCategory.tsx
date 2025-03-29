import { ActionType } from '../../../redux/ActionType';
import { AppState } from '../../../redux/AppState';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './AddCategory.css'


export default function AddCategory() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const [categoryName, setCategoryName] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const handleAddCategory = async () => {
        //debugger;

        if (!categoryName.trim()) {
            alert("Category name cannot be empty");
            return;
        }

        try {
            const token = userLogin.token;
            if (!token) {
                alert("User is not logged in!");
                return;
            }

            const categoryEntity = await axios.post(
                "http://localhost:8080/categories",
                { category: categoryName }, 
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            dispatch({
                type: ActionType.addCategory,
                payload: { id: categoryEntity.data.id, category: categoryEntity.data.category }
            });

            setCategoryName("");
            alert("Category added successfully!");
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Error adding category.");
        }
    };

return (
        <div className="category-add-container">
            <input
                type="text"
                value={categoryName}
                onChange={handleInputChange}
                placeholder="Enter category name"
                className="category-input"
            />
            <button onClick={handleAddCategory} className="add-btn">Add Category</button>
        </div>
    );
}

