import React from "react";
import "../estilos/landingPage.css"

export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
    const pageNumber = []

    for (let i = 0; i <= Math.ceil(allRecipes/recipesPerPage)-1; i++) {
        pageNumber.push(i+1)
        
    }

    return (
        <nav>
            <ul className="paginado" >
                {pageNumber && pageNumber.map(number => (
                     <button className="button-recipe selecionado" onClick ={() => paginado(number)}>{number}</button>
                ))} 
            </ul>
        </nav>
    )
}