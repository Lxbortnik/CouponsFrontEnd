import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});




/*



return (
    <div className="couponsContainer">
        {props.coupons.map((coupon, index) => (
            <Coupon
                key={index}
                id={coupon.id}
                title={coupon.title}
                description={coupon.description}
                price={coupon.price}
                companyName={coupon.companyName}
                categoryName={coupon.categoryName}
                startDate={coupon.startDate}
                endDate={coupon.endDate}
                amount={coupon.amount}
                imageUrl={coupon.imageUrl}
           //     updateCoupon={props.updateCoupons} // העברת הפונקציה לעדכון
            />
        ))}
    </div>
)

*/