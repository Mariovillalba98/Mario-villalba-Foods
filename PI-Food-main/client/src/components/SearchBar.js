import React from "react";
import { useState, useEfect } from "react";
import { getNameRecipes } from "../actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    function handleImputChange(e) {
        e.preventDefault();
        setName(e.target.value)


    }
    function handleSubmit(e){

        e.preventDefault();
        if(name.length === 0) {
            alert("Por favor escriba un receta para iniciar la búsqueda")
        } else {
        dispatch(getNameRecipes(name))
        setName("")
    }
    }
    return(
        <div>
            <input
            type = "text" 
            placeholder="Buscar..." 
            value={name}
            onChange={handleImputChange}
            />
            <button onClick={handleSubmit} 
             type= "submit" >Buscar</button>
        </div>
    )
        
    
}