


 import React from "react";
 import { useState, useEffect } from "react";
 import { useSelector, useDispatch } from "react-redux";
 import { useHistory } from "react-router-dom";
 import { Link } from "react-router-dom";
 import { getDiets, postRecipes } from "../actions";
 import "../estilos/form.css"


 function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = "El campo nombre es requerido"
    }else if((!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name))){
        errors.name = "El campo nombre solo acepta letras"
    }
    if(!input.summary){
     errors.summary = "Por favor agrege algún comentario sobre su receta"
    }else if((!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.summary))){
        errors.summary = "El campo summary solo acepta letras"
    }
    if(!input.image){
        errors.image = "El campo imagen es requerido"
    }else if((!/.+\.(jpg|png)$/.test(input.image))){
        errors.image = "La imagen debe ser de tipo jpg o png"
    }
    if(!input.healthScore){
        errors.healthScore = "Es necesario un valor"
    }else{
        if(input.healthScore < 1 || input.healthScore > 100)
        errors.healthScore = "El puntaje debe ser entre 1 y 100"  
    }
    if (!input.steps){
        errors.steps = "Por favor detalle los pasos de su receta"
    }else if((!/^[A-Za-z0-9\s]+$/g.test(input.steps.trim()))){
       errors.steps = "El campo paso a paso solo acepta letras y numeros "
    }
    return errors
    }

    


export default function RecipesCreate(){
 const dispatch = useDispatch()
 const history = useHistory()
 const dietas = useSelector((state)=> state.diets)
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
      healthScore: e.target.value,
    };
    setInput(newinputrangue);
    
  }



function handleSelect(e) {
    if (!input.diets.includes(e.target.value)) {
    
    setInput({
        ...input,
        diets:[...input.diets, e.target.value] //concatena las dietas al estado
    }) }
    else alert("La dieta ya está incluida")
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
 }, []);

 return(
    <div>
        <Link to = "/home"><button >Regresar</button></Link>
        <h1>CREA TU RECETA</h1>
        <form onSubmit={(e)=>handleSubmit(e)} >
            <div>
                <label>Nombre </label>
                <input 
                type="text"
                value={input.name}
                name="name"
                placeholder="Escribe el nombre..."
                onChange={handleChange} />
                {errors.name && <p className="danger">{errors.name}</p>}
            </div>
            <div>
                <label>Resumen </label>
                <input 
                type="text"
                value={input.summary}
                name="summary" 
                placeholder="Detalla la receta..."
                onChange={handleChange} />
                {errors.summary && <p className="danger">{errors.summary}</p>}
            </div>
            <div>
                <label>Imagen </label>
                <input 
                type="text"
                value={input.image}
                name="image" 
                placeholder="URL de imagen..."
                onChange={handleChange} />
                {errors.image && <p className="danger">{errors.image}</p>}
            </div>
            <div>
                <label>Nivel Salubre </label>
                <input 
                type="range"
                min="1"
                max="100"
                value={input.healthScore}
                name="healthScore"
                onChange={rangeHandleChangue} />
                <text>{input.healthScore}</text>
                {errors.healthScore && <p className="danger">{errors.healthScore}</p>}
            </div>
            <div>
                <label>Pasos </label>
                <input 
                type="text"
                value={input.steps}
                name="steps"
                placeholder="Describe los pasos..."
                onChange={handleChange}
                 />
                 {errors.steps&& <p className="danger">{errors.steps}</p>}
            </div>
            <div>
            <label>Dieta </label>
            <select onChange={handleSelect}>
                {dietas.map(x=>(
                    <option value={x.name}>{x.name}</option>
                ))}
            </select>
            </div>

            <button className="button-recipe5"
            
            type="submit" >Crear receta</button>
        

        </form>

        {input.diets.map(el=> 
        <div>
            <p>{el}</p> 
            <button onClick={()=> handleDelete(el)} >x</button>
        </div>
        )}

    </div>
 )
}