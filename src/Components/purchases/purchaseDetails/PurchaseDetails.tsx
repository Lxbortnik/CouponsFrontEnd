
import { useDispatch, useSelector } from 'react-redux';
import { IPurchase } from '../../../modules/IPurchase';
import { AppState } from '../../../redux/AppState';
import axios from 'axios';
import { ActionType } from '../../../redux/ActionType';

export default function PurchaseDetails(props: IPurchase) {


    const timestamp = new Date(props.timestamp);
    const endDate = new Date(props.endDate);
    const userLogin = useSelector((state: AppState) => state.userLogin);
    const dispatch = useDispatch();

    async function handleDelete() {
        if (!userLogin.token) {
            alert("You must be logged in to delete purchases.");
            return;
        }

        const confirmation = window.confirm(`Are you sure you want to delete the purchase with ID: ${props.id}?`);
        if (!confirmation) {
            return;
        }

        try {
            let url = ""

            if (userLogin.userType == "admin") {
                url = `http://localhost:8080/purchases/ByAdmin/${props.id}`;
            }


            await axios.delete(url, {
                headers: {
                    Authorization: userLogin.token
                }
            });
            alert(`Purchase with ID: ${props.id} has been successfully deleted.`);

            dispatch({
                type: ActionType.deletePurchase,
                payload: props.id
            });
        } catch (error) {
            alert("Failed to delete the purchase. Please try again later.");
        }
    }


    return (
        <tr className="PurchaseDetails">
            {/* <td>
                {props.imageUrl && (
                    <img
                        src={props.imageUrl}
                        alt={props.title}
                    />
                )}
            </td> */}
            <td>{props.amount}</td>
            <td>{props.totalPrice}</td>
            <td>{timestamp.toLocaleDateString()}</td>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{endDate.toLocaleDateString()}</td>
          
        </tr>
    );
}
