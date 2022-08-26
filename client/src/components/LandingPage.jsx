import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";


export default function LandingPage(){
    return(
    <div className="LandingPage">
        <h1>Bienvenidos a mi proyecto</h1>
        <Link to = "/Home">
            <button>Ingresar</button>
        </Link>
    </div>
    )
}