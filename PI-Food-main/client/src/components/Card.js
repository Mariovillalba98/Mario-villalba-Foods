import React from "react";
import "../estilos/card.css"

export default function Card ({image, name, diets}) {
    return (
        <div className="contenedor-testimonio">
            
            <img className="imagen-testimonio" src= {image} alt= "la imagen no se pudo cargar" width="200px" height="250px"/>
            
            <div className="contenedor-texto-testimonio" >
            <h3  className="nombre-testimonio" >{name}</h3>
            <p className="texto-testimonio">{diets.join(",  ")}</p>
                
    
            </div>
        </div>
    )
}