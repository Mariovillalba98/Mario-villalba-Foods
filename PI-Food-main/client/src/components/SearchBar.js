import React from "react";
import { useState } from "react";
import { getNameRecipes } from "../actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import logodorado from "../estilos/logodorado.png"
import { Button } from "@mui/material";
import "../estilos/home.css"
import { cleanFilter, getRecipes } from "../actions";




const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));









export default function SearchBar() {
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    useEffect (()=> {
      dispatch(getRecipes());
      },[dispatch])

    function handleClick(e){
      e.preventDefault();
      dispatch(cleanFilter())
      dispatch(getRecipes());
  }




    function handleImputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        dispatch(getNameRecipes(name))}

    // function handleSubmit(e){

    //     e.preventDefault();

    //     dispatch(getNameRecipes(name))
    //     setName("")
   
    // }




    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    // const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    // const handleProfileMenuOpen = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
  
    // const handleMobileMenuClose = () => {
    //   setMobileMoreAnchorEl(null);
    // };
  
    // const handleMenuClose = () => {
    //   setAnchorEl(null);
    //   handleMobileMenuClose();
    // };
  
    // const handleMobileMenuOpen = (event) => {
    //   setMobileMoreAnchorEl(event.currentTarget);
    // };
  
    // const menuId = 'primary-search-account-menu';
    // const renderMenu = (
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     id={menuId}
    //     keepMounted
    //     transformOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     open={isMenuOpen}
    //     onClose={handleMenuClose}
    //   >
    //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    //   </Menu>
    // );
  
    // const mobileMenuId = 'primary-search-account-menu-mobile';
    // const renderMobileMenu = (
    //   <Menu
    //     anchorEl={mobileMoreAnchorEl}
    //     anchorOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     id={mobileMenuId}
    //     keepMounted
    //     transformOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     open={isMobileMenuOpen}
    //     onClose={handleMobileMenuClose}
    //   >
    //     <MenuItem>
    //       <IconButton size="large" aria-label="show 4 new mails" color="inherit">
    //         <Badge badgeContent={4} color="error">
    //           <MailIcon />
    //         </Badge>
    //       </IconButton>
    //       <p>Messages</p>
    //     </MenuItem>
    //     <MenuItem>
    //       <IconButton
    //         size="large"
    //         aria-label="show 17 new notifications"
    //         color="inherit"
    //       >
    //         <Badge badgeContent={17} color="error">
    //           <NotificationsIcon />
    //         </Badge>
    //       </IconButton>
    //       <p>Notifications</p>
    //     </MenuItem>
    //     <MenuItem onClick={handleProfileMenuOpen}>
    //       <IconButton
    //         size="large"
    //         aria-label="account of current user"
    //         aria-controls="primary-search-account-menu"
    //         aria-haspopup="true"
    //         color="inherit"
    //       >
    //         <AccountCircle />
    //       </IconButton>
    //       <p>Profile</p>
    //     </MenuItem>
    //   </Menu>
    // );








    

    return(

        <Box sx={{ flexGrow: 1, }}>
        <AppBar sx={{backgroundColor:"rgb(67, 0, 0)"}} position="absolute">
          <Toolbar>
            <Button onClick={e=>{handleClick(e)}} size="small"
            >
            <img className="logo" src={logodorado} alt="logo food"/>
            </Button>
            <Search value={name} onChange={handleImputChange}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }}/>
            <Link to="/form">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, color:"white" }}
            >
              <AddBoxIcon />
            </IconButton>
            </Link>

                       {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
             */}
 
          </Toolbar>
        </AppBar>
      </Box>





    )
        
    
}




        // <div>
        //     <input className="search-bar"
        //     type = "text" 
        //     placeholder="Buscar..." 
        //     value={name}
        //     onChange={handleImputChange}
        //     />
        //     <button className="button-search" onClick={handleSubmit} 
        //      ><AiOutlineSearch/></button>
        // </div>