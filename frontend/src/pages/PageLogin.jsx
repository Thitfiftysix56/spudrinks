import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider, Typography,Box, } from '@mui/material';
import {Button,TextField ,Grid } from "@mui/material";
import Logo_Spu from '../imgs/logo.png'
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  });

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#ffffff'),
    backgroundColor: "#f54960",
    '&:hover': {
      backgroundColor: "#ed3867",
    },
  }));

const theme = createTheme({
    typography: {
      fontFamily: ["Kanit", "cursive"].join(","),
    },
  });

function PageLogin() {

  const [allUser, setAllUser] = useState([]);
  const [alerts, setAlerts] = useState(false)
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const navigate = useNavigate()


  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/GetAllData`)
      .then((res) => {
        setAllUser(res.data)  
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  // console.log(allUser)

  const login = async () => {
    // console.log("email","password",email,password)
    let result = await fetch(process.env.REACT_APP_API + '/Login' , {
      method: 'POST',
      body:JSON.stringify({userName,passWord}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result);
    if(result[0]){
          localStorage.setItem("user",JSON.stringify(result))
          navigate("/PageSelectBeverage")
    }else{
      setAlerts(true);
       toast.error("Username หรือ Password ไม่ถูกต้อง  กรุณาติดต่อ admin");
    }
  }

  return (
    <>
    <ThemeProvider theme={theme}>
    {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
    <Box sx={{ width:{lg:'100%',md:'100vw',sm:'100vw',xs:'100vw'},
            height:{lg:'113vh',md:'113vh',sm:'100%',xs:'100%'},background:"linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)" , display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
      <Navbar />
      <Box sx={{width:{lg:'50vw',md:'60vw',sm:'60vw',xs:'80vw'},height:{lg:'80vh',md:'80vh',sm:'60vh',xs:'60vh'},backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px',borderRadius:'10px',marginTop:'40px'}}>
                
                <Box sx={{display:{lg:'flex',md:'flex',sm:'flex',xs:'none'},justifyContent:'center',alignItems: 'center',background:'#ffffff',borderRadius:'100%',padding:'5px',margin:'5px',width:'100px',height:'100px' }}>
                      <img alt="complex" src={Logo_Spu} style={{width:'60px',height:'60px'}} />
                </Box>
               
                
                    <Box sx={{textAlign:'center'}}>
                        <Typography  gutterBottom  sx={{
    fontSize: {
      lg: 20,
      md: 20,
      sm: 15,
      xs: 15
    },color:'#ffffff'
  }}>
            SPU DRINKS
                        </Typography>
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                      <Typography gutterBottom  sx={{
    fontSize: {
      lg: 20,
      md: 20,
      sm: 15,
      xs: 15
    },color:'#ffffff'
  }}>
                    เข้าสู่ระบบ
                          </Typography>
                    </Box>
                    <Box sx={{margin:'20px',width:'100%'}}>
                      <CssTextField id="outlined-basic" fullWidth  label="Username" onChange={e => setUserName(e.target.value)} variant="outlined" />
                    </Box>
                    <Box sx={{margin:'20px',width:'100%'}}>
                      <CssTextField id="outlined-basic" fullWidth  label="Password" onChange={e => setPassWord(e.target.value)} variant="outlined" />
                    </Box>
                 
                    
                    <Grid container  columns={{ xs: 4, sm: 8, md: 12 }}>
  <Grid item xs={4} sm={8} md={6}>
  <Box sx={{marginRight:{lg: '10px',
      md: '10px',
      sm: 0,
      xs: 0} , marginTop:{lg: '0',
      md: '0',
      sm: '10px',
      xs: '10px'}}}>
    <ColorButton fullWidth variant="contained" sx={{color:'#ffffff'}} onClick={() => login()}>เข้าสู่ระบบ</ColorButton>
    </Box>
  </Grid>
  <Grid item xs={4} sm={8} md={6}>
  <Box sx={{marginLeft:{lg: '10px',
      md: '10px',
      sm: 0,
      xs: 0}, marginTop:{lg: '0',
      md: '0',
      sm: '10px',
      xs: '10px'}}}>
  <Link to="/PageRegister" style={{textDecoration: 'none'}}>
    <ColorButton fullWidth variant="contained" sx={{color:'#ffffff'}}>สมัครสมาชิก</ColorButton>
    </Link>
    </Box>
  </Grid>
</Grid>
                   
<Box sx={{textAlign:'center',marginTop:'40px'}}>
                      <Typography gutterBottom  sx={{
    fontSize: {
      lg: 15,
      md: 15,
      sm: 10,
      xs: 10
    }
  }}>
                    Version 0.0.1
                          </Typography>
                    </Box> 
                </Box>

<Footer />
      </Box>
    </ThemeProvider>
    </>
  )
}

export default PageLogin