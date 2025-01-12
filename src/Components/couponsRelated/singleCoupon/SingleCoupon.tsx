import React from "react";
import { useLocation } from "react-router-dom";
import"./SingleCoupon.css"

export default function SingleCoupon() {

    const location = useLocation();
    const coupon = location.state;

    if (!coupon) {
        return <p>No coupon data available.</p>;
    }

    function buyCoupon(id: number) {
        alert(`This coupon id ${id}`); //checking that clicked on the right coupon
    }

    return (
        <div className="SingleCoupon">
            {coupon.imageUrl && (
                <img src={coupon.imageUrl} alt={coupon.title} className="single-coupon-image" />
            )}
            <h1>{coupon.title}</h1>
            <p>{coupon.description}</p>
            <p>Price: ${coupon.price}</p>
            <p>Company: {coupon.companyName}</p>
            <p>Start Date: {new Date(coupon.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(coupon.endDate).toLocaleDateString()}</p>
            <p>Available Stock: {coupon.amount}</p>
            <button onClick={() => buyCoupon(coupon.id)}>buy now</button>
        </div>
    );

}
