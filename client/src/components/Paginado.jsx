import React from "react";
import "./Paginado.css";


export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = [];
 //math.ceil redondea para arriba todas las recetas sobre la cantidad de recetas que quiero por pagina
    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i+1);
        
    }
    return(
        <nav className="paginado"> 
            <ul>
                {pageNumbers && 
                 pageNumbers.map(number => (
                    <li key={number}>
                    {<a onClick={() => paginado(number)}>{number}</a>}
                    </li>
                ))}
            </ul>
        </nav>
    )
}