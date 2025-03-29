import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import Company from "../company/Company";
import './CompanyContainer.css'

export default function CompanyContainer() {
    const dispatch = useDispatch();
    const companiesModel = useSelector((state: AppState) => state.companies);

    return (
        <table className="companyContainer">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Address</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {companiesModel.length > 0 ? (
                    companiesModel.map((company) => (
                        <Company
                            key={company.id}
                            id={company.id}
                            name={company.name}
                            address={company.address}
                            phone={company.phone}
                        />
                    ))
                ) : (
                    <p>Loading companies...</p>
                )}
            </tbody>
        </table>
    )
}