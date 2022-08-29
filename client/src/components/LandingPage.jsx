import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import bgImage from '../assets/food-pi.jpg';


export default function LandingPage(){
    return(
    <div className="LandingPage">
        <img className="landingImage" src={bgImage} />
        <div className="titulo1">
            <h1>Welcome to my Food Project</h1>
            <Link to = "/Home">
                <button className="boton1">let's see the recipes</button>
            </Link>
        </div>
    </div>
    )
}