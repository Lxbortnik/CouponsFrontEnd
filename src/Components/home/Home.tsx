import axios from "axios";
import { ActionType } from "../../redux/ActionType";
import CouponContainer from "../coupon/couponContainer/CouponsContainer";
import Search from "../search/searchForCoupons/SearchForCoupons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const couponsPerPage = 4; // Number of items per page
    const [totalPages, setTotalPages] = useState(1);
    let companyFilter = useSelector((state: AppState) => state.companyFilter);
    const categoryFilter = useSelector((state: AppState) => state.categoryFilter);
    const userLogin = useSelector((state: AppState) => state.userLogin);

    useEffect(() => {
        if (currentPage !== 0) {
            setCurrentPage(0);
        }
    }, [companyFilter, categoryFilter]);


    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                if (userLogin.userType === "company") {
                    companyFilter = userLogin.companyId;
                }
                const params = new URLSearchParams();

                if (companyFilter) params.append("companyId", String(companyFilter));
                if (categoryFilter) params.append("categoryId", String(categoryFilter));

                const url = `http://localhost:8080/coupons/all?page=${currentPage}&size=${couponsPerPage}&${params.toString()}`;
                console.log("Fetching from:", url);

                const response = await axios.get(url);
                //debugger;
                dispatch({ type: ActionType.getAllCoupons, payload: response.data.content });
                setTotalPages(response.data.totalPages);

            } catch (error) {
                console.error("Error fetching coupons:", error);
                alert("Error fetching coupons.");
            }


        };

        fetchCoupons();
    }, [currentPage, companyFilter, categoryFilter]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {

                const response = await axios.get(`http://localhost:8080/companies`);
                const companies = response.data.content;

                dispatch({ type: ActionType.getCompanies, payload: companies });
            } catch (error) {
                console.error("Error fetching companies:", error);
                alert("Error fetching companies.");
            }
        };

        fetchCompanies();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {

            try {

                const response = await axios.get(`http://localhost:8080/categories`);
                const categories = response.data.content;

                dispatch({ type: ActionType.getCategories, payload: categories });
            } catch (error) {
                console.error("Error fetching categories:", error);
                alert("Error fetching categories");
            }
        };

        fetchCategories();
    }, []);


    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="home-container">
            <span className="home-title">Design the Home You Deserve</span>
            <div className="search">
                <Search />
            </div>

            <CouponContainer />

            <div className="pagination-controls">
                <button onClick={prevPage} >Previous</button>
                <button onClick={nextPage} >Next</button>
            </div>
        </div>
    );
}