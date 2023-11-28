import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider, Typography,Box, } from '@mui/material';
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import {Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
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

function PageRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [nameAccount, setNameAccount] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const navigate = useNavigate()



  
  const [status_Person, setStatus_Person] = useState('User')
  const [image_Person, setImage_Person] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [user, setUser] = useState([])
  const [alerts, setAlerts] = useState(false)



  const submit = () => {
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('userName', userName)
    formData.append('passWord', passWord)
    formData.append('nameAccount', nameAccount)
    formData.append('birthDay', birthDay)
    formData.append('numberPhone', numberPhone)
    formData.append('status_Person', status_Person)
    formData.append('file',image_Person)
    Axios.post(process.env.REACT_APP_API + '/RegisUser',formData)
    .then((res) => {
      setAlerts(true)
      toast.success("ระบบได้ทำการสมัครเรียบร้อยแล้ว");
      setTimeout(function() {
        navigate('/')
        // localStorage.clear();
      }, 3000);
      // console.log(res)
       })
       .catch((err) => {
        if(err.response.status === 400) {
          toast.error("กรุณาสมัครใหม่อีกครั้ง");
          navigate('/PageRegister')
        } else {
          console.log("err: ", err.response.data)
        }
      })
  }

  useEffect(() => {
    if (image_Person) {
      setImageUrl(URL.createObjectURL(image_Person))
    }
  }, [image_Person])

  return (
    <>
     <ThemeProvider theme={theme}>
     {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
        <Box sx={{ width:{lg:'100%',md:'100%',sm:'100%',xs:'100%'},
            height:{lg:'150vh',md:'150vh',sm:'120vh',xs:'150vh'},background:"linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)" , display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
            <NavbarLogin />
            <Box sx={{width:{lg:'50vw',md:'60vw',sm:'60vw',xs:'80vw'},height:{lg:'120vh',md:'100vh',sm:'80vh',xs:'110vh'},backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px',borderRadius:'10px',marginTop:'40px'}}>
<Box>
        <Typography
            variant="h6"
            sx={{
              fontFamily: 'kanit',
              fontWeight: 400,
              color: '#ffffff',
            }}
          >
            สมัครสมาชิก
          </Typography>
</Box>
<Box sx={{marginTop:'20px' ,display:'flex',justifyContent: 'center',alignItems: 'center',flexDirection:'column',width:'100%'}}>
<Box sx={{margin:'10px'}}>
    <Avatar sx={{width:'80px',height:'80px'}}  alt="ไม่มีรูป"   src={imageUrl} />
</Box>
<Box sx={{margin:'10px'}}>
<input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={(e) => setImage_Person(e.target.files[0])}
              />
              
                <label htmlFor="select-image">
                <center>
                  <ColorButton variant="contained" sx={{color:'#ffffff'}} component="span">
                    กดเพื่ออัพโหลดรูปโปรไฟล์
                  </ColorButton>
                </center>
              </label>
</Box>
<Box sx={{margin:'10px',width:'100%'}}>
<CssTextField id="outlined-basic" fullWidth label="Username" variant="outlined" onChange={e => setUserName(e.target.value)}/>
</Box>
<Box sx={{margin:'10px',width:'100%'}}>
<CssTextField id="outlined-basic" fullWidth label="Password" variant="outlined" onChange={e => setPassWord(e.target.value)}/>
</Box>
<Box sx={{margin:'10px',width:'100%'}}> 
<CssTextField id="outlined-basic" fullWidth label="ชื่อบัญชีผู้ใช้งาน" variant="outlined" onChange={e => setNameAccount(e.target.value)}/>
</Box>
<Box sx={{margin:'10px',width:'100%'}}>
<CssTextField id="outlined-basic" fullWidth label="ชื่อ" variant="outlined" onChange={e => setFirstName(e.target.value)}/>
</Box>
<Box sx={{margin:'10px',width:'100%'}}>
<CssTextField id="outlined-basic" fullWidth label="นามสกุล" variant="outlined" onChange={e => setLastName(e.target.value)}/>
</Box>
<Box sx={{margin:'10px',width:'100%'}}>
<CssTextField name="someDate" label="เดือน/วัน/ปีเกิด" InputLabelProps={{ shrink: true, required: true }} type="date" fullWidth onChange={e => setBirthDay(e.target.value)}/>
</Box>
<Box sx={{margin:'10px',width:'100%'}}>
<CssTextField id="outlined-basic" fullWidth label="เบอร์โทรศัพท์" variant="outlined" onChange={e => setNumberPhone(e.target.value)}/>
</Box>
<Grid container  columns={{ xs: 4, sm: 8, md: 12 }} sx={{margin:'10px'}}>
  <Grid item xs={4} sm={8} md={6}>
  <Box sx={{marginRight:{lg: '10px',
      md: '10px',
      sm: 0,
      xs: 0} , marginTop:{lg: '0',
      md: '0',
      sm: '10px',
      xs: '10px'}}}>
  <Link to="/" style={{textDecoration: 'none'}}>
    <ColorButton fullWidth variant="contained" startIcon={<ArrowBackIcon />} sx={{color:'#ffffff'}}>BLACK</ColorButton>
    </Link>
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

   <ColorButton fullWidth variant="contained" sx={{color:'#ffffff'}} onClick={() => submit()}>สมัครสมาชิก</ColorButton>

    </Box>
  </Grid>
</Grid>
</Box>


          </Box>
          <Footer />
        </Box>
    </ThemeProvider>

    </>
  )
}

export default PageRegister