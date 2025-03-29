import { useEffect, useState } from "react";
import { IPurchase } from "../../../modules/IPurchase";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import axios from "axios";
import { ActionType } from "../../../redux/ActionType";
import PurchaseDetailsContainer from "../purchaseDetailsContainer/PurchaseDetailsContainer ";

export default function HomePurchaseDetails() {
    const [purchasesDetailsFromDb, setPurchasesDetailsFromDb] = useState<IPurchase[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const countPurchasesInPage = 10;
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const [searchUserId, setSearchUserId] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        loadPurchases(page);
    }, [page, searchUserId]);

    const fetchAllPurchasesWithPage = async (pageNumber: number) => {
        try {
            let url = userLogin.userType === "admin"
                ? `http://localhost:8080/purchases?page=${pageNumber}&size=${countPurchasesInPage}`
                : `http://localhost:8080/purchases/bycustomer?page=${pageNumber}&size=${countPurchasesInPage}`;

            const response = await axios.get(url, {
                headers: { Authorization: userLogin.token },
            });

            setPurchasesDetailsFromDb(response.data.content);
            dispatch({ type: ActionType.updateAllPurchase, payload: response.data.content });
            setTotalPages(response.data.totalPages);
        } catch (e) {
            alert(`Error fetching purchase: ${e}`);
            console.error("Error details:", e);
        }
    };

    const fetchAllPurchasesByCustomerIdWithPage = async (pageNumber: number) => {
        try {
            let url = `http://localhost:8080/purchases/AdminToCustomerId/${searchUserId}?page=${pageNumber}&size=${countPurchasesInPage}`;

            const response = await axios.get(url, {
                headers: { Authorization: userLogin.token },
            });

            setPurchasesDetailsFromDb(response.data.content);
            dispatch({ type: ActionType.updateAllPurchase, payload: response.data.content });
            setTotalPages(response.data.totalPages);
        } catch (e) {
            alert(`Error fetching purchase: ${e}`);
            console.error("Error details:", e);
        }
    };

    const loadPurchases = (pageNumber: number) => {
        if (searchUserId.trim() === "") {
            fetchAllPurchasesWithPage(pageNumber);
        } else {
            fetchAllPurchasesByCustomerIdWithPage(pageNumber);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            <span className="title-1">Purchases</span>
            <div>
                {userLogin.userType === "admin" && (
                    <>
                        <h3>Search Purchases by User ID:</h3>
                        <input
                            type="number"
                            placeholder="Enter User ID"
                            value={searchUserId}
                            onChange={(e) => {
                                setSearchUserId(e.target.value);
                                setPage(0);
                            }}
                        />
                    </>
                )}
            </div>
            <PurchaseDetailsContainer />

            <div className="pagination-buttons">
                <button onClick={handlePrevPage} className="pagination-button" disabled={page === 0}>
                  Next Page
                </button>
                <button onClick={handleNextPage} className="pagination-button" disabled={page >= totalPages - 1}>
                 Previous Page
                </button>
            </div>
        </>
    );
}


