// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Coupon, { ICoupon } from "../coupon/Coupon";
// import "./Container.css"

// export interface Category {
//     id: number;
//     name: string;
// }

// export interface ICouponContainer {
//     coupons: ICoupon[];
// }
// export default function CouponsContainer(props: ICouponContainer) {
//     const [pageNumber, setPageNumber] = useState(0);
//     const couponsNumberOnPage = 3;
//     const [coupons, setCoupons] = useState<ICoupon[]>([]);
//     const [totalPages, setTotalPages] = useState(0);
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState('');

//     useEffect(() => {
//         getCategories();
//     }, []);

//     useEffect(() => {
//         if (selectedCategory) {
//             getCouponsByCategory(pageNumber);
//         } else {
//             getCoupons(pageNumber);
//         }
//     }, [pageNumber, selectedCategory]);

//     const getCategories = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/categories');
//             setCategories(response.data.content);
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     const getCoupons = async (pageNumber: number) => {
//         try {
//             let url = `http://localhost:8080/coupons?page=${pageNumber}&size=${couponsNumberOnPage}`;
//             const response = await axios.get(url);
//             setCoupons(response.data.content);
//             setTotalPages(response.data.totalPages);
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     const getCouponsByCategory = async (pageNumber: number) => {
//         try {
//             const url = `http://localhost:8080/coupons/bycategoryname?page=${pageNumber}&size=${couponsNumberOnPage}&categoryName=${selectedCategory}`;
//             const response = await axios.get(url);
//             setCoupons(response.data.content);
//             setTotalPages(response.data.totalPages);
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedCategory(event.target.value);
//         setPageNumber(0); // Reset to the first page
//     };

//     const goToNextPage = () => {
//         if (pageNumber < totalPages - 1) {
//             setPageNumber(pageNumber + 1);
//         }
//     };

//     const goToPreviousPage = () => {
//         if (pageNumber > 0) {
//             setPageNumber(pageNumber - 1);
//         }
//     };

//     return (
//         <div className="couponsContainer">
//             {/* Dropdown for Categories */}
//             <select value={selectedCategory} onChange={handleCategoryChange}>
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                     <option key={category.id} value={category.name}>
//                         {category.name}
//                     </option>
//                 ))}
//             </select>

//             {/* Coupons List */}
//             {coupons.length > 0 ? (
//                 coupons.map((coupon) => (
//                     <div className="coupon" key={coupon.id}>
//                         <Link to={`/coupon/coupondetails/${coupon.id}`} className="coupon-link">
//                             <Coupon
//                                 id={coupon.id}
//                                 title={coupon.title}
//                                 description={coupon.description}
//                                 price={coupon.price}
//                                 startDate={coupon.startDate}
//                                 endDate={coupon.endDate}
//                                 amount={coupon.amount}
//                                 imageUrl={coupon.imageUrl}
//                                 companyName={coupon.companyName}
//                                 categoryName={coupon.categoryName}
//                             />
//                         </Link>
//                     </div>
//                 ))
//             ) : (
//                 <div>
//                     <p>No Coupons available</p>
//                 </div>
//             )}

//             {/* Pagination */}
//             <div className="pagination">
//                 <button onClick={goToPreviousPage} disabled={pageNumber === 0}>
//                     Previous
//                 </button>
//                 <span>
//                     Page {pageNumber + 1} of {totalPages}
//                 </span>
//                 <button onClick={goToNextPage} disabled={pageNumber >= totalPages - 1}>
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }



import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Coupon, { ICoupon } from "../coupon/Coupon";
import "./Container.css";

interface Category {
    id: number;
    category: string;
}

export interface ICouponContainer {
    coupons: ICoupon[];
}

export default function CouponsContainer(props: ICouponContainer) {
    const [pageNumber, setPageNumber] = useState(0);
    const couponsNumberOnPage = 3;
    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        getCategories();
        if (selectedCategory) {
            getCouponsByCategory(pageNumber);
        } else {
            getCoupons(pageNumber);
        }
    }, [pageNumber, selectedCategory]);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data.content);
        } catch (e) {
            console.error(e);
        }
    };

    const getCoupons = async (pageNumber: number) => {
        try {
            let url = `http://localhost:8080/coupons?page=${pageNumber}&size=${couponsNumberOnPage}`;
            const response = await axios.get(url);
            setCoupons(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const getCouponsByCategory = async (pageNumber: number) => {
        try {
            const url = `http://localhost:8080/coupons/bycategoryname?page=${pageNumber}&size=${couponsNumberOnPage}&categoryName=${selectedCategory}`;
            const response = await axios.get(url);
            setCoupons(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setPageNumber(0);
    };

    const goToNextPage = () => {
        if (pageNumber < totalPages - 1) {
            setPageNumber(pageNumber + 1);
        }
    };

    const goToPreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <div className="couponsContainer">
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.category}>
                        {category.category}
                    </option>
                ))}
            </select>

            {coupons.length > 0 ? (
                coupons.map((coupon) => (
                    <div className="coupon" key={coupon.id}>
                        <Link to={`/coupon/coupondetails/${coupon.id}`} className="coupon-link">
                            <Coupon
                                id={coupon.id}
                                title={coupon.title}
                                description={coupon.description}
                                price={coupon.price}
                                startDate={coupon.startDate}
                                endDate={coupon.endDate}
                                amount={coupon.amount}
                                imageUrl={coupon.imageUrl}
                                companyName={coupon.companyName}
                                categoryName={coupon.categoryName}
                            />
                        </Link>
                    </div>
                ))
            ) : (
                <div>
                    <p>No Coupons available</p>
                </div>
            )}

            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={pageNumber === 0}>
                    Previous
                </button>
                <span>
                    Page {pageNumber + 1} of {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={pageNumber >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}