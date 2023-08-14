import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Upload from "./Upload";
import Pay from "./Pay"
import "./Navbar.css"
import Home from "./Home";
import Complain from "./Complain";
function Navbar() {
    return (

        <>
            <BrowserRouter>
                <nav>
                    <h3>Muzaffar</h3>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/Upload"}>Upload</Link>
                        </li>
                        <li>
                            <Link to={"/Pay"}>Pay</Link>
                        </li>
                        <li>
                            <Link to={"/Complain"}>Complain</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route
                        path="/"
                        element={<Home/>}
                        
                    />
                    <Route
                        path="/Upload"
                        element={<Upload />}
                    /> <Route
                        path="/pay"
                        element={<Pay />}
                    />
                    <Route
                        path="/Complain"
                        element={<Complain />}
                    />



                </Routes>





            </BrowserRouter>

        </>
    )
}
export default Navbar;