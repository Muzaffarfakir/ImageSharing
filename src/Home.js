import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
    let [like, setLike] = useState(false);
    let [act, setact] = useState(0)
    let [arr, setArr] = useState([]);
    let [co, setColor] = useState('red')
    let [data, setData] = useState([]);
    let nav=useNavigate()

    let infi = (e) => {
        fetch("https://image-back.onrender.com/data").then((res) => res.json()).then((d) => {
            setData(d.data)
        });
    }

    useEffect(() => {
        infi()
    }, [])


    function del(id) {
      axios.delete(`https://image-back.onrender.com//del/${id}`)
      nav('/Complain')


    }

    return (
        <>


            <h2 class="text-center">
                HERE YOU GET ANY KIND OF IMAGE
            </h2>
            {data.map((el) => {
                return <div class="card mb-3 mx-4 my-3">
                    <img src={`../upload/${el.img}`} class="card-img" alt="Image here" />
                    <div class="card-body">
                        <span onClick={()=>del(el._id)} class="bg-blue" >
                            <i   class="fa-sharp fa-solid fa-trash fa-lg " ></i>


                        </span>

                    </div>
                </div >


            })}




        </>
    )
}
export default Home;
