import React from "react";
import  { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, filterDiets, OrderByName, OrderByHealthScore, savePage, cleanFilter } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../estilos/home.css"
import "../estilos/loading.css"
import logo from "../estilos/logo.png"

export default function Home () {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const pages1 = useSelector(((state)=>state.pages)) 
    const [orden, setOrden] = useState('')
    const [score, setScore] = useState(1)
    const [currentPage, setCurrentPage] = useState(pages1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexLastRecipe = currentPage * recipesPerPage
    const indexFirstRecipe = indexLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)

    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
    }

    function handlePage(e){
      dispatch(savePage(currentPage))
    }

    useEffect (()=> {
    dispatch(getRecipes());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(cleanFilter())
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
    if (!allRecipes.length) {
      return <img className="loading" src="https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif"></img>
    }
    return (
        <div className="contenedor-principal">
      <Link to = "/form"><button className="button-recipe">Crear receta</button></Link>
      <img className="logo" src={logo} />
      {/* <h1>BIENVENIDOS A HENRY FOODS</h1>  */}
      <button className="button-recipe" onClick={e=>{handleClick(e)}}>
        Inicio
      </button>
      <div>
        <select className="button-recipe" onChange={e => handleSort(e)}>
            <option value="asc">Orden (A,z) </option>
            <option value="desc">Orden (Z,a)</option>
        </select>
        <select className="button-recipe" select onChange={e => handleHealthScore(e)} >
            <option value ="ascendente">Más saludable</option>
            <option value ="descendente">Menos saludable</option>
        </select>
        <select className="button-recipe" onChange={e => {handleFilterDiets(e)}}>
            <option value="all">Todas</option>
            <option value="gluten free">Gluten free</option>
            <option value="dairy free">Dairy free</option>
            <option value="lacto ovo vegetarian">Lacto vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="fodmap friendly">Fodmap friendly</option>
        </select> 
        <div>
          <SearchBar/>
        </div>
        <Paginado
        recipesPerPage = {recipesPerPage}
        allRecipes = {allRecipes.length}
        paginado = {paginado}
        />

     
      {currentRecipes?.map((x)=> {
        return(

          <div>
            <Link className="nombre-testimonio"  onClick={(e)=>handlePage(e)} to = {"/home/"+x.id}>
        <Card name={x.name} image={x.image ? x.image : <img src="https://bitsofco.de/content/images/2018/12/broken-1.png"></img> } diets={x.diets} key={x.id} />
            </Link>
        </div>)})} 

         {allRecipes.length === 0 && <p>RECETAS NO ENCONTRADAS</p>}     
      </div>      
        </div>
    )
}
 
