import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";
import { ICoupon } from "../../modules/ICoupon";

interface Props {
    coupon: ICoupon;
    closeModal: () => void;
}

export default function CouponUpdateModal({ coupon, closeModal }: Props) {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);

    // Convert initial strings or Dates to Date objects
    const [title, setTitle] = useState(coupon.title);
    const [description, setDescription] = useState(coupon.description);
    const [price, setPrice] = useState(coupon.price);
    const [startDate, setStartDate] = useState(new Date(coupon.startDate));
    const [endDate, setEndDate] = useState(new Date(coupon.endDate));
    const [amount, setAmount] = useState(coupon.amount);

    const handleUpdate = async () => {
        const updatedCoupon = {
            ...coupon,
            title,
            description,
            price,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            amount,
        };
//debugger
        try {
         
            await axios.put("http://localhost:8080/coupons/byCompany", updatedCoupon, {
                headers: {
                    Authorization: userLogin.token,
                    "Content-Type": "application/json",
                },
            });

            dispatch({ type: ActionType.updateCoupon, payload: updatedCoupon });
            alert("Coupon updated successfully!");
            closeModal();
        } catch (error) {
            console.error("Error updating coupon:", error);
            alert("Failed to update coupon.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Coupon</h2>

                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Description:</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />

                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate.toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                />

                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate.toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                />

                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />

                <div className="modal-buttons">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
