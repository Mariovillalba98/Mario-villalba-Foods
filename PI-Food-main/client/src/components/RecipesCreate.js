import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getDiets, postRecipes } from "../actions";
import { Rating, CardContent } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Button from '@mui/material/Button';


function validate(input){
  let errors = {}
  if(!input.name){
      errors.name = "El campo nombre es requerido"
  }else if((!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name))){
      errors.name = "El campo nombre solo acepta letras"
  }
  if(!input.summary){
   errors.summary = "El campo summary es requerido"
  }else if((!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.summary))){
      errors.summary = "El campo summary solo acepta letras"
  }
  if(!input.image){
      errors.image = "El campo imagen es requerido"
  }else if((!/.+\.(jpg|png)$/.test(input.image))){
      errors.image = "La imagen debe ser de tipo jpg o png"
  }
//   if(!input.healthScore){
//       errors.healthScore = "Es necesario un valor"
//   }else if(input.healthScore < 0 || input.healthScore > 100) {
//       errors.healthScore = "El puntaje debe ser entre 1 y 100"  
//   }
  if (!input.steps){
      errors.steps = "Por favor detalle los pasos de su receta"
  }else if((!/^[A-Za-z0-9\s]+$/g.test(input.steps.trim()))){
     errors.steps = "El campo paso a paso solo acepta letras y numeros "
  }
  return errors
  }

  



export default function RecipesCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const dietas = useSelector((state)=> state.diets)
  const [dietitas, setDietitas] = React.useState('');
  const [errors,setErrors] = useState({})
 // console.log(dietas)
 const [input, setInput] = useState({name:"",
 summary:"",
 image:"",
 healthScore:0,
 steps:"",
 diets:[]
 })
 
 function handleChange(e){
     setInput({
         ...input,
         [e.target.name] : e.target.value
     }) 
     setErrors(validate({
         ...input,
         [e.target.name]:e.target.value
 }))
 
 }
 
 function rangeHandleChangue(e) {
     const newinputrangue = {
       ...input,
       healthScore: e.target.value*20,
     };
     setInput(newinputrangue);
     
   }
 
 
 
 function handleSelect(e) {
     setInput({
         ...input,
         diets:[...input.diets, e.target.value] //concatena las dietas al estado
     })
     setDietitas(e.target.value) 
 }
 
 
 function handleSubmit(e){
     e.preventDefault();
     if(input.name && input.summary&&input.image&&input.healthScore&&input.steps
         &&!errors.name&& !errors.summary&&!errors.image&&!errors.healthScore&&!errors.steps&&input.diets.length !==0 &&input.diets.length<=3)
 
     {dispatch(postRecipes(input))
     alert("Receta creada con exito!")
     setInput({
         name:"",
         summary:"",
         image:"",
         healthScore:0,
         steps:"",
         diets:[]
     })
     history.push("/home")}
     else alert ("Por favor, complete el formulario correctamente")
 }
 
 
 function handleDelete(el){
     setInput({
         ...input,
         diets: input.diets.filter(x=> x!== el)
     })
 }
 
 
 
 
  useEffect(()=> {
 dispatch(getDiets())
  }, [dispatch]);




  return (
    <div>
    <CardActions>
    <Button size="small"><Link to = "/home"><ArrowCircleLeftOutlinedIcon sx={{width:50, height:50, color:"rgb(67, 0, 0)"}} /></Link></Button>
    </CardActions>

    <Card sx={{minWidth:345 ,maxWidth: 700}} >
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        backgroundColor:"rgb(184, 162, 107)"
      }}
      noValidate
      autoComplete="off"
    >

                      <h1>Create Recipe</h1>
                      {!errors.name? <FormControl  variant="standard">
                            <InputLabel  htmlFor="component-simple">Name</InputLabel>
                            <Input id="component-simple" name="name" value={input.name} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Name</InputLabel>
                            <Input
                            id="component-error"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
                        </FormControl>}

                        {!errors.summary? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Summary</InputLabel>
                            <Input id="component-simple" name="summary" value={input.summary} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Summary</InputLabel>
                            <Input
                            id="component-error"
                            name="summary"
                            value={input.summary}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.summary}</FormHelperText>
                        </FormControl>}

                        {!errors.image? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Image</InputLabel>
                            <Input id="component-simple" name="image" value={input.image} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Image</InputLabel>
                            <Input
                            id="component-error"
                            name="image"
                            value={input.image}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.image}</FormHelperText>
                        </FormControl>}

                        {!errors.steps? <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Steps</InputLabel>
                            <Input id="component-simple" name="steps" value={input.steps} onChange={handleChange} />
                        </FormControl>
                            :
                        <FormControl error variant="standard">
                            <InputLabel htmlFor="component-error">Steps</InputLabel>
                            <Input
                            id="component-error"
                            name="steps"
                            value={input.steps}
                            onChange={handleChange}
                            aria-describedby="component-error-text"/>
                            <FormHelperText id="component-error-text">{errors.steps}</FormHelperText>
                        </FormControl>}
                        <Rating name="half-rating" defaultValue={5} value={input.healthScore/20} precision={0.5} onChange={rangeHandleChangue} 
                          />                 
                          <text>{input.healthScore}</text>

                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Diets</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dietitas}
                            label="dietitas"
                            onChange={handleSelect}
                            >
                            {dietas.map(x=>(
                            <MenuItem value={x.name}>{x.name}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        {input.diets.map(el=> 
                            <Chip label={el} variant="outlined" onDelete={()=> handleDelete(el)} />
                        )}

                    {Object.entries(errors).length===0 && input.name!==""?<CardContent>   
                        <FormControl>
                        <Button type='submit' onClick={(e)=>handleSubmit(e)} >Create</Button> 
                        </FormControl>
                    </CardContent>
                    :
                    <CardContent>   
                        <FormControl>
                        <Button disabled>Create</Button>
                        </FormControl>
                    </CardContent>}
                    {console.log(errors)}
                    {console.log(input.healthScore)}
                    

    </Box>
    </Card>
    </div>
  );
}

