import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ title, image, dietType, id, healthScore, createInDb }) {
    return (
        <div className="container">
            <div className="card">
            <h3>{title}</h3>
            <Link to={"/home/" +id}>
            <img src={image} alt= "img not found" width="200px" height="250px" />
            </Link>
            <ul className="tiposss">{dietType.map(e => {
                return <li key={e}>{e}</li>
            })}</ul>
            <h3>{healthScore}</h3>
            <p>{createInDb}</p>
        </div>
        </div>


           
    );
}