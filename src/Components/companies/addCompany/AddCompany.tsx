import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/ActionType";
import './AddCompany.css'


export default function AddCompany() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: AppState) => state.userLogin);

    const [newCompany, setNewCompany] = useState({
        name: "",
        address: "",
        phone: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCompany((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddCompany = async () => {
        //debugger;
        try {
            const token = userLogin.token;
            if (!token) {
                alert("User is not logged in!");
                return;
            }

            const companyEntitySave = await axios.post(
                "http://localhost:8080/companies",
                newCompany,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            //debugger;

            dispatch({
                type: ActionType.addCompany,
                payload: {
                    id: companyEntitySave.data.id,
                    name: companyEntitySave.data.name,
                    address: companyEntitySave.data.address,
                    phone: companyEntitySave.data.phone
                }
            });



            alert("Company added successfully!");
            setNewCompany({ name: "", address: "", phone: "" });
        } catch (error) {
            console.error("Error adding company:", error);
            alert("Failed to add company.");
        }
    };

    return (
        <div className="add-company">
            <h2>Add New Company</h2>
            <input
                type="text"
                name="name"
                value={newCompany.name}
                onChange={handleInputChange}
                placeholder="Company Name"
            />
            <input
                type="text"
                name="address"
                value={newCompany.address}
                onChange={handleInputChange}
                placeholder="Address"
            />
            <input
                type="text"
                name="phone"
                value={newCompany.phone}
                onChange={handleInputChange}
                placeholder="Phone"
            />
            <button className="save-btn" onClick={handleAddCompany}>
                Add Company
            </button>
        </div>
    );
}


