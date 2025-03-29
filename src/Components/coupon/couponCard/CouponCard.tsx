import { useNavigate } from "react-router-dom";
import { ICouponDetails } from "../../../modules/ICouponDetails";
import "./CouponCard.css"


export default function CouponCard(couponProps: ICouponDetails) {
    const startDate = new Date(couponProps.startDate).toLocaleDateString();
    const endDate = new Date(couponProps.endDate).toLocaleDateString();
    const navigate = useNavigate();


    function handleCouponClick() {
        navigate(`/coupon/${couponProps.id}`);
    }
    return (
        <div className="CouponCard" onClick={handleCouponClick}>
            {couponProps.imageUrl && <img src={couponProps.imageUrl} alt={couponProps.title} className="coupon-image" />}
            <h1>{couponProps.title}</h1>
          
            <div> {couponProps.description} </div>
            <p>Price: ₪{couponProps.price}</p>
            <div>End Date: {new Date(couponProps.endDate).toLocaleDateString()}</div>

        </div>
    )
}