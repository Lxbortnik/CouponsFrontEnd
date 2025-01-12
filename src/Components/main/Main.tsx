import React from "react";
import Home from "../home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "../usersRelated/Login/Login";
import Register from "../usersRelated/register/Register";
import About from "../about/About";
import "./Main.css"
import CouponContainer from "../couponsRelated/couponsContainer/CouponContainer";
import Coupon from "../couponsRelated/coupon/Coupon";
import SingleCoupon from "../couponsRelated/singleCoupon/SingleCoupon";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/coupon" element={<Coupon id={0} title={""} description={""} price={0} startDate={""} endDate={""} amount={0} companyName={""} categoryName={""} imageUrl={""} />} />
            <Route path="/couponsContainer" element={<CouponContainer coupons={[]} />} />
            <Route path="/coupon/coupondetails/:id" element={<SingleCoupon />} />
        </Routes>
    );
}