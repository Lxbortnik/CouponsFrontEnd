import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/ActionType";
import './SearchForCoupons.css'

export default function SearchForCoupons() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const companiesFromDB = useSelector((state: AppState) => state.companies);
    const categoriesFromDB = useSelector((state: AppState) => state.categories);

    const [selectedCompanyId, setSelectedCompanyId] = useState<number | "">("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">("");

    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const companyId = event.target.value ? Number(event.target.value) : "";
        setSelectedCompanyId(companyId);
        dispatch({ type: ActionType.updateCompanyFilter, payload: companyId || null });
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = event.target.value ? Number(event.target.value) : "";
        setSelectedCategoryId(categoryId);
        dispatch({ type: ActionType.updateCategoryFilter, payload: categoryId || null });
    };

    if (userLogin?.userType === "company") {
        return null;
    }

    return (
        <div className="search-container">
            {/* <label htmlFor="CompanyFilter">Company:</label> */}
            <select id="CompanyFilter" value={selectedCompanyId} onChange={handleCompanyChange}>
                <option value="">All Companies</option>
                {companiesFromDB.map((company) => (
                    <option key={company.id} value={company.id}>
                        {company.name}
                    </option>
                ))}
            </select>
    
            {/* <label htmlFor="CategoryFilter">Category:</label> */}
            <select id="CategoryFilter" value={selectedCategoryId} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categoriesFromDB.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.category}
                    </option>
                ))}
            </select>
        </div>
    );
}