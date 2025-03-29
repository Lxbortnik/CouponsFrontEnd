import React from 'react'
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/AppState';
import PurchaseDetails from '../purchaseDetails/PurchaseDetails';
import './PurchaseDetailsContainer.css';


export default function PurchaseDetailsContainer () {
  const allPurchase = useSelector((state: AppState) => state.purchases);

  return (
      <div className="purchase-container">
            <table className="purchase-table">
                <thead>
                    <tr>
                
                        <th>Amount</th>
                        <th>Total Price</th>
                        <th>Purchase Date</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allPurchase.map((purchase, index) => (
                        <PurchaseDetails key={index} {...purchase} />
                    ))}
                </tbody>
            </table>
      </div>
  );
}