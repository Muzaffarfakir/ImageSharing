import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";

function Complain() {
    let nav=useNavigate()
    function send(){
        nav('/')
    }


    return (
        <>
            <div class="card mx-3 ">
                <h2 class="text-center">GIVE THE VALID REASON SO WE DELETE THE IAMGE </h2>
                <div class="card-body mx-6 my-6 mb-6">
                    <select class="text-center">
                        <option >I Dont' Like This Image </option>
                        <option >This Image Contian Blood Or Voilence </option>
                        <option >This Image Contian Nazi Symbol </option>
                        <option >This Image Contian Nudes </option>
                        <option > This Image 18 + Content </option>

                    </select>
                    <button onClick={send}  class="btn btn-outline-secondary text-center" type="button">Send</button>

                </div>
            </div>

        </>
    )
}
export default Complain;