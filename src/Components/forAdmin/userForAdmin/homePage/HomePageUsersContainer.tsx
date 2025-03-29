import { useEffect, useState } from "react";
import { IUser } from "../../../../modules/IUser";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../redux/AppState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionType } from "../../../../redux/ActionType";
import UsersContainer from "../UsersContainer/UsersContainer";
import "./HomePageUsersContainer.css"


export default function HomePageUsersContainer() {
    const dispatch = useDispatch();
    const [allUserFromDb, setAllUserFromDb] = useState<IUser[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const size = 6;
    const userLgin = useSelector((state: AppState) => state.userLogin);


    const userIdFilter = useSelector((state: AppState) => state.usersFilter);
    const companyFilter = useSelector((state: AppState) => state.companyFilter);
    const userTypeFilter = useSelector((state: AppState) => state.userTypeFilter);


    useEffect(() => {
        if (currentPage !== 0) {
            setCurrentPage(0);
        }
    }, [companyFilter, userTypeFilter, userIdFilter]);


    useEffect(() => {
        const fetchUsers = async () => {
            //debugger
            try {
                const params = new URLSearchParams();
                if (companyFilter) params.append("companyId", String(companyFilter));
                if (userIdFilter) params.append("id", String(userIdFilter));
                if (userTypeFilter) params.append("userType", String(userTypeFilter));

                if (userLgin.userType === "admin") {
                    const url = `http://localhost:8080/users/bycompanyid?page=${currentPage}&size=${size}&${params.toString()}`;
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: userLgin.token,
                        },
                    });

                    setAllUserFromDb(response.data.content);
                    dispatch({ type: ActionType.getAllUsers, payload: response.data.content });
                    setTotalPages(response.data.totalPages);
                }
            } catch (e) {
                alert(`Error fetching users: ${e}`);
                console.error("Error details:", e);
            }
        };

        fetchUsers();
    }, [currentPage, userLgin, userIdFilter, companyFilter, userTypeFilter]);


    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };


    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };


    return (
        <>
            <UsersContainer
            />
            <div className="pagination-buttons">
                <button
                    onClick={handlePrevPage}
                    className="pagination-button"
                    disabled={currentPage === 0}
                >
                    Previous Page
                </button>
                <button
                    onClick={handleNextPage}
                    className="pagination-button"
                    disabled={currentPage >= totalPages - 1}
                >
                    Next Page
                </button>
            </div>
        </>
    );
}
