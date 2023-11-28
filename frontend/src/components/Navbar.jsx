import React, { useState, useEffect } from 'react'
import { Typography,Box, } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo_Spu from '../imgs/logo.png'
import { Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#ffffff'),
    backgroundColor: "#f54960",
    '&:hover': {
      backgroundColor: "#ed3867",
    },
  }));

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const Location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [imgUser, setImgUser] = useState("");
    const [alerts, setAlerts] = useState(false)
    const navigate = useNavigate()
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
  



    
const IdUser = JSON.parse(localStorage.getItem('user'))
     

  return (
   <>
     {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
      <AppBar position="static" sx={{ background: "rgba(228 ,228 ,228 ,0.10)",boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{background:'#ffffff',borderRadius:'100%',padding:'5px',margin:'10px'}}>
                <img src={Logo_Spu} alt="ไม่มีรูปภาพ" style={{width:'50px',height:'50px'}}/>
            </Box>

<Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              fontFamily: 'kanit',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize:{lg:'24px',md:'22px',sm:'20px',xs:'18px'},
              marginLeft:{lg:'30px',md:'0',sm:'0',xs:'0'},
            }}
          >
            SPU DRINKS
          </Typography>

</Box>

<Link to="/" style={{textDecoration: 'none'}}><ColorButton sx={{color: '#ffffff'}} startIcon={<ArrowBackIcon />} variant="contained">BLACK</ColorButton> </Link>

          

        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default Navbar