import React  from "react";
import {Link} from "react-router-dom";
import "../estilos/landingPage.css"

export default function LandingPage(){
    return(
        <div className="landing-page">
            
            <div >
            {/* <h1>Bienvenidos a foods</h1> */}
            <Link to = "/home" >
                <button className="button-recipe3" >Ingresar</button>
            </Link>
            </div>
        </div>
    )
}