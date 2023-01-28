import React  from "react";
import {Link} from "react-router-dom";
import "../estilos/landingPage.css";
import henryfood from "../estilos/henryfood.png";
import { Box } from "@mui/material";

export default function LandingPage(){
    return(
        <div className="landing-page">
            <Box 
            sx={{
                mt: 8,
                mb: 12,
                p: 2,
                maxWidth: "1200px",
                mx: "auto",
                backgroundImage:""
            }}
            > 
            
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                }}
                >   <img src={henryfood} alt="Logo not found" />          
                    <Link to = "/home" >
                        <button className="button-recipe3" >Menu</button> 
                    </Link>
                </Box>
            </Box>
        </div>    
    )
}