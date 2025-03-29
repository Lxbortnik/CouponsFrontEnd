import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { IUser } from "../../../modules/IUser";
import { useEffect, useState } from "react";
import { ICustomerDetails } from "../../../modules/ICustomerDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ICustomer } from "../../../modules/ICustomer";
import { ActionType } from "../../../redux/ActionType";
import './MyUser.css'

export default function MyUser() {
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const [user, setUser] = useState<IUser | null>(null);
    const [customer, setCustomer] = useState<ICustomerDetails | null>(null);
    const [isEditingCustomer, setIsEditingCustomer] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState<ICustomerDetails | null>(null);
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState<string>("");
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            //debugger;
            try {
                const userResponse = await axios.get<IUser>(`http://localhost:8080/users/myUser`, {
                    headers: { Authorization: userLogin.token },
                });
                setUser(userResponse.data);

                const customerResponse = await axios.get<ICustomerDetails>(`http://localhost:8080/customers/mycustomer`, {
                    headers: { Authorization: userLogin.token },
                });
                setCustomer(customerResponse.data);
                //debugger;
                setEditedCustomer(customerResponse.data); 
            } catch (e) {
                alert("Error fetching data.");
            }
        };

        fetchData();
    }, [userLogin.token]);

    const saveCustomerDetails = async () => {
        if (!editedCustomer || !user) return;  

    const customer: ICustomer = {
        id:editedCustomer.id,
        name:editedCustomer.name,
        address:editedCustomer.address,
        phone: editedCustomer.phoneNumber, 
        user: user         
    };
    customer.user.id = customer.id;

    //debugger;
        try {
            console.log("Customer being sent:", customer);
            await axios.put(
                `http://localhost:8080/customers`,
                customer,
                { headers: { Authorization: userLogin.token } }
            );

            setCustomer({id:customer.id , name:customer.name,username:customer.user.username,address:customer.address,phoneNumber:customer.phone});
            alert("Customer details updated successfully.");
            setIsEditingCustomer(false);
        } catch (error) {
            alert("Failed to update customer details.");
            console.error(error);
        }
    };

    const handleInputChange = (field: keyof ICustomerDetails, value: string | number) => {
        if (!editedCustomer) return;
        setEditedCustomer({ ...editedCustomer, [field]: value });
    };

    async function deleteMyUser() {
        if (!user) return;

        const isConfirmed = window.confirm(`Are you sure you want to delete your user?`);
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/users/deleteMyUser`, {
                    headers: { Authorization: userLogin.token },
                });
                alert("User deleted successfully.");
                setUser(null);
                    dispatch({ type: ActionType.logOut });
                
                navigate('/');

            } catch (error) {
                alert("Error deleting user.");
                console.error(error);
            }
        }
    }

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <>
            <span className="title-1">My User Info</span>
            <div className="MyUser">
                <div className="DetailsWrapper">

                    <div className="UserDetailsWrapper">
                        <h3>User Details:</h3>
                        <div><strong>Username:</strong> {user.username}</div>
                        <div><strong>User Type:</strong> {user.userType}</div>
                        <div><strong>Company ID:</strong> {user.companyId}</div>

                            {customer && (
                        <>
                            <h3 className="CustomerDetails">Customer Details:</h3>
                            <div>
                                <strong>Address:</strong>
                                {isEditingCustomer ? (
                                    <input
                                        type="text"
                                        value={editedCustomer?.address || ""}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                    />
                                ) : (
                                    <span>{customer.address}</span>
                                )}
                            </div>
                            <div>
                                <strong>Name:</strong>
                                {isEditingCustomer ? (
                                    <input
                                        type="text"
                                        value={editedCustomer?.name || ""}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                    />
                                ) : (
                                    <span>{customer.name}</span>
                                )}
                            </div>
                            <div>
                                <strong>Phone Number:</strong>
                                {isEditingCustomer ? (
                                    <input
                                        type="text"
                                        value={editedCustomer?.phoneNumber || ""}
                                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                    />
                                ) : (
                                    <span>{customer.phoneNumber}</span>
                                )}
                            </div>

                            {isEditingCustomer ? (
                                <div>
                                    <button onClick={saveCustomerDetails}>Save</button>
                                    <button onClick={() => setIsEditingCustomer(false)}>Cancel</button>
                                </div>
                            ) : (
                                <button onClick={() => setIsEditingCustomer(true)}>Edit Details</button>
                            )}
                        </>
                    )}
                    </div>
                </div>
                <div>
                    <button className="delete-btn" onClick={deleteMyUser}>Delete Your User</button>
                </div>
            </div>
        </>
    );
}



    // const updatePassword = async () => {
    //     if (!newPassword) {
    //         alert("Please enter a new password.");
    //         return;
    //     }

    //     try {
    //         await axios.put(
    //             `http://localhost:8080/users`,
    //             { userName: user?.username, password: newPassword },
    //             { headers: { Authorization: userLogin.token } }
    //         );

    //         alert("Password updated successfully.");
    //         setNewPassword("");
    //         setIsEditingPassword(false);
    //     } catch (e) {
    //         alert("Failed to update password.");
    //         console.error(e);
    //     }
    // };
