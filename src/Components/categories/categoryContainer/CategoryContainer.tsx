import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../../redux/AppState";
import { useMemo, useState } from "react";
import Category from "../category/Category";
import './CategoryContainer.css'

export default function CategoryContainer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state: AppState) => state.categories);
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategoriesView = useMemo(() => {// what is use memo
        return categories.filter(category =>
            category.category.includes(searchTerm) 
        );
    }, [searchTerm, categories]);

    return (
        <div className="categories-container">

           

            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="search-input"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategoriesView.length > 0 ? (
                        filteredCategoriesView.map((category) => (
                            <Category key={category.id} id={category.id} category={category.category} />
                        ))
                    ) : (
                        <p>Loading categories...</p>
                    )}
                </tbody>
            </table>
        </div>
    );
}


