import { Route, Routes } from "react-router-dom";
import Home from "../../home/Home";
import SingleCoupon from "../../coupon/singleCoupon/SingleCoupon";
import About from "../../about/About";
import Login from "../../userRelated/LogIn/Login";
import Register from "../../userRelated/Register/Register";
import MyUser from "../../userRelated/myUser/MyUser";

import AddUser from "../../User/addUser/AddUser";
import CompanyContainer from "../../companies/companiesConteiner/ComapnyContainer";
import AddCompany from "../../companies/addCompany/AddCompany";
import CategoryContainer from "../../categories/categoryContainer/CategoryContainer";
import AddCategory from "../../categories/addCategory/AddCategory";
import CompanyCouponPage from "../../companyCouponPage/CompanyCouponPage";
import "./Main.css"
import CreateCoupon from "../../coupon/CreateAndUpdateCoupon/CreateCoupon";
import HomePurchaseDetails from "../../purchases/homePurchaseDetails/HomePurchaseDetails";
import HomePageUsersContainer from "../../forAdmin/userForAdmin/homePage/HomePageUsersContainer";

export default function Main() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coupon/:id" element={<SingleCoupon />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/myUser" element={<MyUser />} />
                <Route path="/addUser" element={<AddUser />} />
                <Route path="/allUsers" element={<HomePageUsersContainer />} />
                <Route path="/allCompanies" element={<CompanyContainer />} />
                <Route path="/addCompany" element={<AddCompany />} />
                <Route path="/allCategories" element={<CategoryContainer />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/createCoupon" element={<CreateCoupon />} />
                <Route path="/companyCouponsPage" element={<CompanyCouponPage />} />
                <Route path="/purchases" element={<HomePurchaseDetails />} />
            </Routes>
        </>
    );
}










