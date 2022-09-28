import React from "react";
import {Link} from "react-router-dom"





export default function ErrorNotFound(){
    return (
        <div>
            <h1>ERROR 404 NOT FOUND</h1>
            <Link to = "/home">
            <button className="button-recipe">Volver</button>
            </Link>
        </div>
    )

}
