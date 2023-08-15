import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
function Upload(e) {
    let nav=useNavigate()
    let [img, setImg] = useState("");
    let k = (e) => {
        setImg(e.target.files[0])

        let data = new FormData();
        let file=e.target.files[0];
        data.append("img",file)
      
        axios({
            method: "post",
            url: "https://image-back.onrender.com/",
            data: data,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }


            }
        })

    }
    function send (){
        if(!img){
            alert("FIRST UPLOAD IMG HERE");
        }
        else{
        nav("/")
    }
}

    return (

        <>
            <form enctype="multipart/form-data" method="post">
                <div class="row px-md-5">
                    <div class="col-lg-4 px-md-5"></div>
                    <div class="col-lg-4 px-md-5 mb-5 my-3">
                        <div class="input-group">

                            <input enctype="multipart/form-data" type="file" name="img" onChange={k} class="form-control" />
                            <span class="input-group-btn">
                                <button onClick={send}  class="btn btn-outline-secondary" type="button">Send</button>
                            </span>
                        </div>
                    </div>
                    <div class="col-lg-4"></div>
                </div>
            </form>

            <h4 class="text-center">
                HERE YOU UPLOAD YOUR IMAGES WHICH YOU WANT TO SHARE WITH OTHERS
            </h4>
        </>
    )

}
export default Upload;
