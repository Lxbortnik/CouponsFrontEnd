import Aside from "./aside/Aside";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";


export default function Layout() {
    return (
        <div className="">
            <Header />
            <aside><Aside /></aside>
            <main className="Main"> <Main /></main>
            <footer><Footer /></footer>
        </div>
    )
}