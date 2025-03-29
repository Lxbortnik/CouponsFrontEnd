import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { useEffect, useState } from "react";
import { ICoupon } from "../../modules/ICoupon";
import { ICouponDetails } from "../../modules/ICouponDetails";
import axios from "axios";
import { ActionType } from "../../redux/ActionType";
import CouponUpdateModal from "../couponUpdateModal/CouponUpdateModal";
import { format } from "date-fns"; // ✅ Import fix
import './CompanyCouponPage.css'

export default function CompanyCouponsPage() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const companyCouponsDetails = useSelector((state: AppState) => state.coupons);

    const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCompanyCoupons = async () => {
            try {
                const response = await axios.get("http://localhost:8080/coupons/bycompanyid", {
                    headers: { Authorization: userLogin.token },
                });

                dispatch({ type: ActionType.getAllCoupons, payload: response.data.content });
            } catch (error) {
                console.error("Error fetching company coupons:", error);
                alert("Error fetching company coupons.");
            }
        };

        fetchCompanyCoupons();
    }, [dispatch, userLogin]);

    const handleEdit = (coupon: ICoupon) => {
        setSelectedCoupon(coupon);
        setShowModal(true);
    };

    const transformCoupons = (coupons: ICouponDetails[]): ICoupon[] => {
        return coupons.map((coupon) => ({
            id: coupon.id,
            title: coupon.title,
            description: coupon.description,
            price: coupon.price,
            startDate: new Date(coupon.startDate), 
            endDate: new Date(coupon.endDate), 
            amount: coupon.amount,
            imageUrl: coupon.imageUrl ?? "",
            companyId: Number(coupon.companyName) || 0, 
            categoryId: Number(coupon.categoryName) || 0, 
        }));
    };

    const companyCoupons: ICoupon[] = transformCoupons(companyCouponsDetails);

    return (
        <div className="company-coupons-page">
            <h1>Your Company Coupons</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companyCoupons.map((coupon) => (
                        <tr key={coupon.id}>
                            <td>{coupon.title}</td>
                            <td>{coupon.description}</td>
                            <td>${coupon.price}</td>
                            <td>{format(coupon.startDate, "yyyy-MM-dd")}</td>  {/* ✅ Fixed */}
                            <td>{format(coupon.endDate, "yyyy-MM-dd")}</td>  {/* ✅ Fixed */}
                            <td>{coupon.amount}</td>
                            <td>
                                <button onClick={() => handleEdit(coupon)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && selectedCoupon && (
                <CouponUpdateModal
                    coupon={selectedCoupon}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
