import React from "react";
import Header from "../Header/Header";
import Aside from "../aside/Aside";
import Footer from "../Footer/Footer";
import Main from "../main/Main";
import "./Layout.css"

export default function Layout(){
    return(
        <div>
                <header>
                    <Header/>
                </header>
                <aside>
                    <Aside/>
                </aside>
                <main>
                    <Main/>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>
    )
    }