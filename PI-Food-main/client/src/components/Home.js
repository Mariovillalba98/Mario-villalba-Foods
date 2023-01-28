import React from "react";
import  { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, filterDiets, OrderByName, OrderByHealthScore, savePage, } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import "../estilos/home.css"
import "../estilos/loading.css"
import { Box, Typography } from "@mui/material";
import "../estilos/card.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import CircularProgress from '@mui/material/CircularProgress';




export default function Home ({contador}) {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const pages1 = useSelector(((state)=>state.pages)) 
    const [orden, setOrden] = useState('')
    const [score, setScore] = useState("")
    const [currentPage, setCurrentPage] = useState(pages1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexLastRecipe = currentPage * recipesPerPage
    const indexFirstRecipe = indexLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe)
    const lasPaginas = Math.ceil(allRecipes.length/recipesPerPage)
    const [diet, setDiet] = React.useState('')




    console.log(allRecipes.length)  

    const paginado = (e, pageNumber) => {
      setRecipesPerPage(9)
      setCurrentPage(pageNumber)
    }

    function handlePage(e){
      dispatch(savePage(currentPage))
    }

    useEffect (()=> {
    dispatch(getRecipes());
    },[dispatch])

    // function handleClick(e){
    //     e.preventDefault();
    //     dispatch(cleanFilter())
    //     dispatch(getRecipes());
    // }

    function handleHealthScore(e){
      e.preventDefault();
      dispatch(OrderByHealthScore(e.target.value))
      setCurrentPage(1);
      setScore(e.target.value)

    }

    function handleSort(e){
      e.preventDefault();
      dispatch(OrderByName(e.target.value))
      setCurrentPage(1);
      setOrden(e.target.value)
    };

    function handleFilterDiets(e){
      dispatch(filterDiets(e.target.value))
      setCurrentPage(1);
      setDiet(e.target.value)
    }



    if (!allRecipes.length) {
      return     <Box sx={{ display: 'flex' }}>
                  <CircularProgress sx={{color:"rgb(67, 0, 0)"}}  />
                  </Box>
    }
    else if(allRecipes.length && allRecipes[0] === "La receta no existe"){

      return <Typography>RECETAS NO ENCONTRADAS</Typography> 
    }

//      if (allRecipes[0] === "La receta no existe") return (      
//      <div><SearchBar/>
//       <h2>RECETAS NO ENCONTRADAS</h2></div>
// )
    // {allRecipes[0] === "La receta no existe"? <h2>RECETAS NO ENCONTRADAS</h2> :} 
    return (
         <div>
          {/* <div className="contenedor-tab">
            <div className="contenedor-logo">
            <button className="boton-home" onClick={e=>{handleClick(e)}}>
            <img className="logo" src={logo} />
            </button>
              
            </div>
            <div className="contenedor-search">
              <SearchBar/>
            </div>
            <div className="contenedor-create">
              <Link to = "/form"><button className="button-create">Crear receta</button></Link>
            </div>
          </div>



      <div className="contenedor-notab">
        <div className="div-select">
          <div className="contenedor-select">
          <select className="button-recipe" onChange={e => handleSort(e)}>
            <option value="asc">Orden (A,z) </option>
            <option value="desc">Orden (Z,a)</option>
        </select>
          </div>
          <div className="contenedor-select">
            <select className="button-recipe" select onChange={e => handleHealthScore(e)} >
            <option value ="ascendente">Más saludable</option>
            <option value ="descendente">Menos saludable</option>
        </select></div>
          <div className="contenedor-select">
            
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
          </div>

        </div>


        <div className="div-paginado"> 
        <Paginado
        recipesPerPage = {recipesPerPage}
        allRecipes = {allRecipes.length}
        paginado = {paginado}
        />
        </div> 
        </div> */}




























  
      {/* <div><SearchBar/></div> */}

      <div>


      <Box sx={{ maxWidth: "1300px", mx: "auto", my: 12 }}>
      {/* <SwipeableTextMobileStepper/> */}


          <div>
        <SwipeableTextMobileStepper  currentPage={currentPage} currentRecipes={currentRecipes} />
        </div>


          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">A-Z</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={orden}
        label="orden"
        onChange={e => handleSort(e)}
      >
        <MenuItem value="asc">A,z</MenuItem>
        <MenuItem value="desc">Z,a</MenuItem>
      </Select>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Score</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={score}
        label="Score"
        onChange={e => handleHealthScore(e)}
      >
        <MenuItem value ="ascendente">High</MenuItem>
        <MenuItem value ="descendente">Low</MenuItem>
      </Select>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Diets</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={diet}
        label="Diets"
        onChange={e => handleFilterDiets(e)}
      >
        <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="gluten free">Gluten free</MenuItem>
            <MenuItem value="dairy free">Dairy free</MenuItem>
            <MenuItem value="lacto ovo vegetarian">Lacto vegetarian</MenuItem>
            <MenuItem value="vegan">Vegan</MenuItem>
            <MenuItem value="paleolithic">Paleolithic</MenuItem>
            <MenuItem value="primal">Primal</MenuItem>
            <MenuItem value="whole 30">Whole 30</MenuItem>
            <MenuItem value="pescatarian">Pescatarian</MenuItem>
            <MenuItem value="ketogenic">Ketogenic</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="fodmap friendly">Fodmap friendly</MenuItem>
      </Select>
    </FormControl>



        
      <Stack>
        <Pagination style={{ display: "flex", textAling: "center", justifyContent: "center"}} count={lasPaginas} page={currentPage} onChange={paginado} />
      </Stack>  

      <Box 
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
      {currentRecipes.length > 0? currentRecipes.map((x)=> {
        return(

          <div>
            <Link className="nombre-testimonio"  onClick={(e)=>handlePage(e)} to = {"/home/"+x.id}>
        <Card name={x.name} image={x.image ? x.image : <img src="https://bitsofco.de/content/images/2018/12/broken-1.png" alt="Not found" ></img> } healthScore={x.healthScore} diets={x.diets} key={x.id} />
            </Link>
        </div>)}): null}
        </Box>     
        </Box>    
      </div>    


      
         

      
            
        </div>
    )
}
 
