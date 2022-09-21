import React from "react";

export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
    const pageNumber = []

    for (let i = 0; i <= Math.ceil(allRecipes/recipesPerPage)-1; i++) {
        pageNumber.push(i+1)
        
    }

    return (
        <nav>
            <ul className="paginado" >
                {pageNumber && pageNumber.map(number => (
                    <li className="number" key={number} >
                    <a onClick={() => paginado(number)} ><button>{number}</button></a>
                    </li>
                ))} 
            </ul>
        </nav>
    )
}