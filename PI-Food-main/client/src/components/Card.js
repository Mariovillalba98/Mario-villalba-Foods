import * as React from 'react';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/system";
import "../estilos/card.css"
import Rating from '@mui/material/Rating';


export default function Prueba({image, name, diets, healthScore, id}) {
  

    return (
        <Card sx={{ minHeight:600, minWidth: 375, maxWidth: 375, margin: "1rem", backgroundColor: "white", boxShadow:"0 3px 13px 1px rgb(0 0 0 / 15%)", borderRadius:0 }}>
      <CardActionArea >
        <CardMedia component="img" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="black">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            mx: "auto",
            mb: 3,
          }}
        > 
            <Rating name="half-rating-read" defaultValue={healthScore/20} precision={0.5} readOnly />
        </Box>

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
            {diets.map((tag) => (
            <Chip label={tag} variant="filled" key={tag} sx={{ color: "black", borderRadius:1}} />
          ))}          
        </Box>
      </CardActions>
    </Card>
    )
}