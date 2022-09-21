import React from "react";

export default function Card ({image, name, diets}) {
    return (
        <div>
            <img src= {image} alt= "la imagen no se pudo cargar" width="200px" height="250px"/>
            <h3>{name}</h3>
            <h5>{diets}</h5>
        </div>
    )
}