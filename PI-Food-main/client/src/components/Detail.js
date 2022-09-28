import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import { cleanFilter } from "../actions/index";
import "../estilos/detail.css";
import "../estilos/loading.css"

export default function Detail(props){
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
        return(()=>{
            dispatch(cleanFilter())
           })
    },[dispatch])

    const losDetalles = useSelector((state)=>state.detail)

    if(!losDetalles.length) {
        return <img className="loading"
        src="https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif" alt="not found" />
    }

    return(
        <div className="contenedor-testimonio1" >
                        <Link to = "/home">
                <button className="button-recipe2" >Regresar</button>
            </Link>
            {
              
               <div>
                <div className="nombre-testimonio1" ><h1>{losDetalles[0].name}</h1></div>
                <div className="imagen-testimonio1" ><img src={losDetalles[0].image}/></div>
                <div><span><ul>{losDetalles[0].diets.map(el=> <h3 className="dietas" >{el}</h3>)}</ul></span></div>
                <div><h4><h2>HealthScore:</h2> {losDetalles[0].healthScore}</h4></div>
                <div><p className="contenedor-texto-testimonio1"><h2 className="salud" >Summary:</h2>  {losDetalles[0].summary.replace(/<[^>]*>/g, '')}</p></div>
                <div className="contenedor-texto-testimonio1"> <h2>Steps:</h2> <ul>{Array.isArray(losDetalles[0].steps)? losDetalles[0].steps.map(el=>{
                    return (
                        <li>{el}</li>)})
                        :
                    <li>{losDetalles[0].steps}</li>
                }
                    </ul>                  
                </div>
               </div> 
            }

        </div> 
    )
}