import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ICouponDetails } from "../../../modules/ICouponDetails";
import { AppState } from "../../../redux/AppState";
import axios from "axios";
import "./SingleCoupon.css";

export default function SingleCoupon() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userLogin = useSelector((state: AppState) => state.userLogin)

    const coupon: ICouponDetails | undefined = useSelector<AppState, ICouponDetails | undefined>(
        (appState: AppState) => appState.coupons.find((coupon) => coupon.id === parseInt(id ?? "0", 10))
    );

    if (!coupon) {
        return <p className="no-coupon">No coupon found</p>;
    }
    const handleBuyCoupon = async () => {
        if (!userLogin.token) {
            alert("You must be logged in to purchase a coupon.");
            return;
        }

        if (userLogin.userType !== "customer") {
            alert("Only customers are allowed to buy coupons.");
            return;
        }

        const purchaseData = {
            customerId: userLogin.userId,
            couponId: coupon.id,
            amount: 1,
            timestamp: new Date().toISOString(),
        };

        try {
            await axios.post("http://localhost:8080/purchases", purchaseData, {
                headers: {
                    Authorization: userLogin.token,
                    "Content-Type": "application/json",
                },
            });

            alert("Coupon purchased successfully!");
            navigate("/");
        } catch (error) {
            console.error("Failed to purchase coupon:", error);
            alert("Error purchasing coupon. Please try again.");
        }
    };

    const deleteCoupon = async (couponId: number) => {
        try {
            if (!userLogin.token) {
                throw new Error("You must be logged in.");
            }

            let url = "";
            if (userLogin.userType === "admin") {
                url = `http://localhost:8080/coupons/byAdmin/${couponId}`;
            } else if (userLogin.userType === "company") {
                url = `http://localhost:8080/coupons/${couponId}`;
            } else {
                alert("Only Admins or Companies can delete coupons.");
                return;
            }

            await axios.delete(url, {
                headers: { Authorization: userLogin.token },
            });

            alert("Coupon deleted successfully!");
            navigate("/");

        } catch (error) {
            console.error("Error deleting coupon:", error);
            alert("Error deleting coupon. Please try again.");
        }
    };

    if (!coupon) {
        return <div>Coupon not found!</div>;
    }



    return (
        <div className="SingleCoupon">
            <div>
                {coupon.imageUrl && (
                    <img src={coupon.imageUrl} alt={coupon.title} className="single-coupon-image" />
                )}
            </div>
            <div>
                <h1 className="coupon-title">{coupon.title}</h1>
                <p className="coupon-description">{coupon.description}</p>
                <p className="coupon-price">Price: ₪{coupon.price}</p>
                <p className="coupon-company">Company: {coupon.companyName}</p>
                <p className="coupon-dates">Start Date: {new Date(coupon.startDate).toLocaleDateString()}</p>
                <p className="coupon-dates">End Date: {new Date(coupon.endDate).toLocaleDateString()}</p>
                <p className="coupon-stock">Available Stock: {coupon.amount}</p>

                <div className="coupon-buttons">
                    {userLogin.userType === "admin" || userLogin.userType === "company" ? (
                        <>
                            <button className="delete-btn" onClick={() => deleteCoupon(coupon.id)}>Delete Coupon</button>
                        </>
                    ) : (
                        <button className="buy-btn" onClick={handleBuyCoupon} disabled={coupon.amount <= 0}>Buy Coupon</button>
                    )}
                </div>
            </div>
        </div>
    );
}
