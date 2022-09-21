import React from "react";
import  { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, filterDiets, OrderByName, OrderByHealthScore } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home () {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    const [orden, setOrden] = useState('')
    const [score, setScore] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexLastRecipe = currentPage * recipesPerPage
    const indexFirstRecipe = indexLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)

    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
    }

    useEffect (()=> {
    dispatch(getRecipes());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleHealthScore(e){
      e.preventDefault();
      dispatch(OrderByHealthScore(e.target.value))
      setCurrentPage(1);
      setScore(`Ordenado ${e.target.value}`)

    }

    function handleSort(e){
      e.preventDefault();
      dispatch(OrderByName(e.target.value))
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`)
    };

    function handleFilterDiets(e){
      dispatch(filterDiets(e.target.value))
      setCurrentPage(1)
    }

    return (
        <div>
      <Link to = "/recipes">Crear receta</Link>
      <h1>BIENVENIDOS A HENRY FOODS</h1> 
      <button onClick={e=>{handleClick(e)}}>
        Refrescar
      </button>
      <div>
        <select onChange={e => handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
        </select>
        <select select onChange={e => handleHealthScore(e)} >
            <option value ="ascendente">Mejor califiacion</option>
            <option value ="descendente">Peor calificacion</option>
        </select>
        <select onChange={e => {handleFilterDiets(e)}}>
            <option value="all">Todos</option>
            <option value="gluten free">Gluten free</option>
            <option value="lacto vegetarian">Lacto vegetarian</option>
            <option value="ovo vegetarian">Ovo vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="low fodmap">Low fodmap</option>
        </select> 

        <Paginado
        recipesPerPage = {recipesPerPage}
        allRecipes = {allRecipes.length}
        paginado = {paginado}
        />

     
      {currentRecipes?.map((x)=> {
        return(

          <div>
            <Link to = {"/home/"+x.id}>
        <Card name={x.name} image={x.image} diets={x.diets} key={x.id} />
            </Link>
        </div>
         )
      })
     }        
      </div>      
        </div>
    )
}
 
