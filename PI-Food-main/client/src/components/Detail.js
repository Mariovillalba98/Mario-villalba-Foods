import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import { cleanFilter } from "../actions/index";
import "../estilos/detail.css";
import "../estilos/loading.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip";
import { Box } from "@mui/system";
import Rating from '@mui/material/Rating';
import CustomizedDialogs from "./CustomizedDialogs";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CircularProgress from '@mui/material/CircularProgress';





export default function Detail(props){

    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
        return(()=>{
            dispatch(cleanFilter())
           })
    },[dispatch, props])

    const losDetalles = useSelector((state)=>state.detail)

    if(!losDetalles.length) {
        return     <Box sx={{ display: 'flex' }}>
        <CircularProgress sx={{color:"rgb(67, 0, 0)"}}  />
        </Box>
    }
    return(
        <div className="elcontenedor"> 
            <CardActions>
                    <Button size="small"><Link to = "/home"><ArrowCircleLeftOutlinedIcon sx={{width:50, height:50, color:"rgb(67, 0, 0)"}} /></Link></Button>
                </CardActions>

            
              
               <div>
               <Card sx={{ minWidth:345 ,maxWidth: 700, }}>
                <CardMedia
                    component="img"
                    alt="image not found"
                    height="140"
                    image={losDetalles[0].image}
                />
                <CardContent>
                <CardActions>
                        <CustomizedDialogs/>
                    </CardActions>
                    <Typography gutterBottom variant="h5" component="div">
                    {losDetalles[0].name}
                    </Typography>
                    <Rating name="half-rating-read" defaultValue={(losDetalles[0].healthScore)/20} precision={0.5} readOnly />
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: "1rem",
                                mb: 2,
                            }}
                            >
                                {losDetalles[0].diets.map((tag) => (
                                <Chip label={tag} variant="filled" key={tag} sx={{ color: "black", borderRadius:1}} />
                            ))}          
                        </Box>
                    <Typography variant="body2" color="text.secondary">
                    {losDetalles[0].summary.replace(/<[^>]*>/g, '')}
                    </Typography>
                </CardContent>
                </Card>
               </div> 
            

        </div> 
    )
}






















/* <div>
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
</div>  */