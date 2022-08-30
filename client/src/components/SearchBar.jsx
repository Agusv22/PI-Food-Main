import React from "react";
import { useState } from "react";
import { dispatch, useDispatch } from "react-redux";
import { getRecipesByTitle } from "../actions";
import "./SearchBar.css"

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    function handleInputChange(e){
        e.preventDefault()
        setTitle(e.target.value)
        console.log(title)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipesByTitle(title)) 
        setCurrentPage(1)
        setTitle("");
    
    }

    return (
        <div className="busqueda">
            <input
            type= "text"
            placeholder= "Search.."
            value ={title}
            onChange={(e) => handleInputChange(e)}
            />
            <button className="searchsito" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )


}
