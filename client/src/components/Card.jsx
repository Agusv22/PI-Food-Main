import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, image, dietType, id, createInDb}) {
    return (
        <div>
            <h3>{title}</h3>
            <h5>{dietType}</h5>
            <Link to={"/home/" +id}>
            <img src={image} alt= "img not found" width="200px" height="250px" />
            </Link>
        </div>
           
    );
}