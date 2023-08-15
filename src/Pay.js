import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";


function Pay() {
    let [text,setText]=useState('');
    function Mu() {
        axios.post("https://image-back.onrender.com/req",{text})

        fetch("http://localhost:8000/pay").then((res) => res.json()).then((data) => {
            window.location = data.url
        })



    }

    return (
        <>
            <h3 class="text-center mb-3 my-3">
                Here You can Donate
            </h3>
            <div class="input-group mb-3 ">

                <input onChange={(e)=>{setText(e.target.value)}} type="number" class="form-control" />
                <span class="input-group-btn">
                    <button onClick={Mu} class="btn btn-outline-secondary" type="button">HELP</button>
                </span>
            </div>
        </>
    )
}
export default Pay;
