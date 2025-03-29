import { useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { ICouponDetails } from "../../../modules/ICouponDetails";
import CouponCard from "../couponCard/CouponCard";
import "./CouponsContainer.css"

export default function CouponContainer() {
    const couponsModel = useSelector((state: AppState) => state.coupons);
   

    return (
    
        <div className="coupon-container">
            {couponsModel.map((couponObj) => (
                <CouponCard
                    key={couponObj.id}
                    id={couponObj.id}
                    title={couponObj.title}
                    description={couponObj.description}
                    price={couponObj.price}
                    startDate={couponObj.startDate}
                    endDate={couponObj.endDate}
                    amount={couponObj.amount}
                    imageUrl={couponObj.imageUrl}
                    categoryName={couponObj.categoryName}
                    companyName={couponObj.companyName} />
            ))}
        </div>
);
}
