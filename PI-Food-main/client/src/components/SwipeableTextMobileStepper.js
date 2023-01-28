import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { savePage } from '../actions'; 
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import CardMedia from '@mui/material/CardMedia';
import "../estilos/carrusel.css"
import MenuBookIcon from '@mui/icons-material/MenuBook';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);





function SwipeableTextMobileStepper({currentRecipes, currentPage}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = currentRecipes.length;
  const dispatch = useDispatch()

  function handlePage(e){
    dispatch(savePage(currentPage))
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  if(!currentRecipes[0].name){
    return null
  }
  
  return (
    
    <Box sx={{  flexGrow: 1,}}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'rgb(67, 0, 0)',
          color:"white"
        }}
      > 
        <Typography><MenuBookIcon/></Typography>
      </Paper>
      <AutoPlaySwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {currentRecipes.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Link onClick={(e)=>handlePage(e)} to = {"/home/"+(step.id)}>
                <CardMedia 

                    component="img"
                    alt="image not found"
                    height="500"
                    image={step.image}
                    
                />               
              </Link>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
      sx={{backgroundColor: 'rgb(67, 0, 0)'}}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
          sx={{color:"white"}}
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{color:"white"}}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;