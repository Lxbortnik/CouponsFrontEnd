import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { useState } from "react";
import axios from "axios";
import { ActionType } from "../../../redux/ActionType";
import './CreateCoupon.css'

function CreateCoupon() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const categories = useSelector((state: AppState) => state.categories);
    const [coupon, setCoupon] = useState({
        title: "",
        description: "",
        price: "",
        categoryId: "",
        startDate: "",
        endDate: "",
        amount: "",
        imageUrl: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCoupon({ ...coupon, [e.target.name]: e.target.value });
    };

    const handleCreateCoupon = async () => {
        if (!coupon.title.trim() || !coupon.description.trim()) {
            alert("Title and Description cannot be empty");
            return;
        }

        try {
            //debugger;
            const token = userLogin.token;
            if (!token) {
                alert("User is not logged in!");
                return;
            }

            const response = await axios.post(
                "http://localhost:8080/coupons/byCompany",
                { ...coupon, categoryId: Number(coupon.categoryId) },
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            dispatch({
                type: ActionType.addCoupon,
                payload: response.data
            });
            setCoupon({
                title: "",
                description: "",
                price: "",
                categoryId: "",
                startDate: "",
                endDate: "",
                amount: "",
                imageUrl: ""
            });
            alert("Coupon created successfully!");
        } catch (error) {
            console.error("Error creating coupon:", error);
            alert("Error creating coupon.");
        }
    };

    return (
        <div className="coupon-add-container">
            <input type="text" name="title" value={coupon.title} onChange={handleInputChange} placeholder="Enter coupon title" className="coupon-input" />
            <input type="text" name="description" value={coupon.description} onChange={handleInputChange} placeholder="Enter description" className="coupon-input" />
            <input type="number" name="price" value={coupon.price} onChange={handleInputChange} placeholder="Enter price" className="coupon-input" />
            
            <select name="categoryId" value={coupon.categoryId} onChange={handleInputChange} className="coupon-input">
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.category}</option>
                ))}
            </select>
            
            <input type="date" name="startDate" value={coupon.startDate} onChange={handleInputChange} className="coupon-input" />
            <input type="date" name="endDate" value={coupon.endDate} onChange={handleInputChange} className="coupon-input" />
            <input type="number" name="amount" value={coupon.amount} onChange={handleInputChange} placeholder="Enter amount" className="coupon-input" />
            <input type="text" name="imageUrl" value={coupon.imageUrl} onChange={handleInputChange} placeholder="Enter image URL" className="coupon-input" />
            <button onClick={handleCreateCoupon} className="add-btn">Create Coupon</button>
        </div>
    );
}

export default CreateCoupon;
