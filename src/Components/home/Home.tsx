import React, { useEffect, useState } from "react";
import CouponContainer from "../couponsRelated/couponsContainer/CouponContainer";
import "./Home.css"

export default function Home() {
    return (
        <div className="home">
            <h1> Welcome!</h1>
            <p> Hello</p>
          <CouponContainer coupons={[]}/>
        </div>
    )

}









