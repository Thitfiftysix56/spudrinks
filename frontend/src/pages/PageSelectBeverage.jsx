import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider, Typography,Box, } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Yellow_Hawaii from '../imgs/Yellow_Hawaii.jpg'
import Kamikaze from '../imgs/Kamikaze.jpg'
import Red_Lady from '../imgs/Red_Lady.jpg'
import Whiskey_soup from '../imgs/Whiskey_soup.jpg'
import Green_Magarita from '../imgs/Green_Magarita.jpg'
import แดงมะนาวโซดา from '../imgs/แดงมะนาวโซดา.jpg'
import เขียวมะนาวโซดา from '../imgs/เขียวมะนาวโซดา.jpg'
import สับปะรดมะนาวโซดา from '../imgs/สับปะรดมะนาวโซดา.png'
import แดงโซดา from '../imgs/แดงโซดา.jpg'
import เขียวโซดา from '../imgs/เขียวโซดา.jpg'
import Footer from '../components/Footer';
import { io } from "socket.io-client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo_Spu from '../imgs/logo.png'
import {useLocation} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { QRCodeCanvas } from "qrcode.react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const theme = createTheme({
    typography: {
      fontFamily: ["Kanit", "cursive"].join(","),
    },
  });
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#ffffff'),
    backgroundColor: "#f54960",
    '&:hover': {
      backgroundColor: "#ed3867",
    },
  }));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function PageSelectBeverage() {

  const IdUser = JSON.parse(localStorage.getItem('user'))
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const Location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [imgUser, setImgUser] = useState("");
  const [alerts, setAlerts] = useState(false)
  const [Menus, setMenus] = React.useState("");
  const [sumAlgohol, setSumAlgohol] = useState([]);
  const [Succ, setSucc] = React.useState("");
  const [volume, setVolume] = useState([]);
// console.log("sumAlgohol",sumAlgohol)


let totalAlcoholBeverage = 0;

for (const item of sumAlgohol) {
  totalAlcoholBeverage += item.Alcohol_Beverage;
}

const isoDate = IdUser[0].Birthday_Person;
const jsDate = new Date(isoDate);
const thaiDate = jsDate.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });

console.log(thaiDate);




  React.useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("Menu", (data) => setMenus(data));
    socket.on("disconnect", () => setMenus("server disconnected"));
  }, []);
  
  React.useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("Succ", (data) => setSucc(data));
    socket.on("disconnect", () => setSucc("server disconnected"));
  }, []);

  useEffect(() => {

    Axios.get(process.env.REACT_APP_API + `/GetBottleVolume`)
    .then((res) => {
      setVolume(res.data)  
    })
    .catch((err) => {
      console.error(err)
    })
  
 
}, [])

  const navigate = useNavigate()
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const logout = () => {
    setAlerts(true)
  toast.success("ระบบจะออกในอีก3วิ");
  setTimeout(function() {
    localStorage.clear();
    navigate('/')
  }, 3000);
}

useEffect(() => {
  if(IdUser[0].ID_Person !==  ''){
    Axios.get(process.env.REACT_APP_API + `/GetSumAlcohol/${IdUser[0].ID_Person}`)
    .then((res) => {
      setSumAlgohol(res.data)  
    })
    .catch((err) => {
      console.error(err)
    })
  }
 
}, [])

React.useEffect(() => {
  if(Succ === 'success'){
    setAlerts(true);
    toast.success("เมนูเสร็จเรียบร้อย");
  }else{
    console.log("error")
  }
}, [Succ]);
const [openaaa, setOpenaaa] = React.useState(false);

const handleClick = () => {
  setOpenaaa(true);
};

const handleCloseaaa = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenaaa(false);
};
  // const ID_Person = JSON.parse(localStorage.getItem('ID_Person'))
 console.log("Succ",Succ)
  return (
    <>
 <ThemeProvider theme={theme}>
 <Box sx={{ width:{lg:'100%',md:'100vw',sm:'100vw',xs:'100vw'},
            height:{lg:'113vh',md:'113vh',sm:'100%',xs:'100%'},background:"linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)" , display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
            
            {/* <Navbar/> */}
           

            {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
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
<Box sx={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>
<Box sx={{marginRight:'20px'}}>
 
            <Link
                to={totalAlcoholBeverage >= 36 || volume[0]?.Volume_Bottle <= 30 ||volume[1]?.Volume_Bottle <= 30 || volume[2]?.Volume_Bottle <= 30 || volume[3]?.Volume_Bottle <= 30 || volume[4]?.Volume_Bottle <= 30 || volume[5]?.Volume_Bottle <= 30 ? "/PageSelectBeverage" : "/PageScanQrCode" }
                style={{ textDecoration: "none", color: "#ffffff" }}
                state={{ from: location.pathname , userid : IdUser[0].ID_Person , Algohol : IdUser[0].Alcohol_Beverage}}
              >
                <Tooltip title="Scan Qrcode">
                <IconButton  variant="contained" onClick={handleClick} sx={{borderRadius:'50%',width:'55px',height:'55px',backgroundColor:'rgba(228 ,228 ,228 ,0.10)'}}  className="blob"> 
                  <QrCodeScannerIcon />
                </IconButton>
                </Tooltip>
              </Link>
              {
                totalAlcoholBeverage >= 36 ? <Snackbar open={openaaa} autoHideDuration={2000} onClose={handleCloseaaa}>
                <Alert onClose={handleCloseaaa} severity="error" sx={{ width: '100%' }}>
                  ไม่สามารถสั่งเครื่องดื่มได้เนื่องจากแอลกอฮอล์เกิน
                </Alert>
              </Snackbar> : volume[0]?.Volume_Bottle <= 30 ||volume[1]?.Volume_Bottle <= 30 || volume[2]?.Volume_Bottle <= 30 || volume[3]?.Volume_Bottle <= 30 || volume[4]?.Volume_Bottle <= 30 || volume[5]?.Volume_Bottle <= 30 ? <Snackbar open={openaaa} autoHideDuration={2000} onClose={handleCloseaaa}>
                <Alert onClose={handleCloseaaa} severity="error" sx={{ width: '100%' }}>
                ไม่สามารถสั่งเครื่องดื่มได้เนื่องมีส่วนผสมบางตัวใกล้หมด
                </Alert>
              </Snackbar> : ''
              }
              
            </Box>

          {Location.pathname === "/PageLogin" ?<Link to="/" style={{textDecoration: 'none'}}><ColorButton sx={{color: '#ffffff'}} startIcon={<ArrowBackIcon />} variant="contained">BLACK</ColorButton> </Link>: <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={IdUser === ''? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw0dST-nJEJhx9fmvvFjQ2BQ&ust=1683907508852000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiAr7nS7f4CFQAAAAAdAAAAABAE': require(`../../src/ImgPerson/uploads/${IdUser[0].Image_Person}`)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleClickOpen}>
                    <Typography textAlign="center" sx={{color:'#000000'}}>ดูข้อมูลผู้ใช้</Typography>
                </MenuItem>
{IdUser[0].Status_Person === 'Admin' ? <MenuItem >
                  <Link to="/PageMannage" style={{textDecoration: 'none'}}> <Typography textAlign="center"  sx={{color:'#000000'}}>จัดการสมาชิก</Typography></Link>
                </MenuItem> : ""}
                <MenuItem >
                 <Link to="/PageSelectBeverage" style={{textDecoration: 'none'}}> <Typography textAlign="center"  sx={{color:'#000000'}}>กลับสู่หน้าหลัก</Typography></Link>
                </MenuItem>
                {IdUser[0].Status_Person === 'Admin' ?
                <MenuItem >
                 <Link to="/PageMannageBeverage" style={{textDecoration: 'none'}}> <Typography textAlign="center"  sx={{color:'#000000'}}>จัดการเครื่องดื่ม</Typography></Link>
                </MenuItem>
: ""}
                <MenuItem >
                  <Typography textAlign="center" sx={{color:'red'}} onClick={() => logout()}>ออกจากระบบ</Typography>
                </MenuItem>
             
            </Menu>
          </Box>}
</Box>

     
          <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            background: "rgba(228 ,228 ,228 ,0.9)"
            ,boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
            borderStyle:'solid',
            borderRadius:'10px'

          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{textAlign:'center'}}>
          ข้อมูลส่วนตัว
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems: 'center'}}>
           <Box sx={{margin:'5px'}}>
              <Avatar alt="Remy Sharp" src={IdUser === ''? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw0dST-nJEJhx9fmvvFjQ2BQ&ust=1683907508852000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiAr7nS7f4CFQAAAAAdAAAAABAE': require(`../../src/ImgPerson/uploads/${IdUser[0].Image_Person}`)} />
           </Box>
           <Box sx={{display:'flex',color:'#000000',margin:'5px'}}>
            <Box >
              <Typography variant="subtitle1">
                ชื่อบัญชีผู้ใช้:
              </Typography>
            </Box>
            <Box>
            <Typography variant="subtitle1">
            {IdUser === ''? "ไม่มีข้อมูล" : IdUser[0].Username_Person}
              </Typography>
            </Box>
           </Box>
           <Box sx={{display:'flex',color:'#000000',margin:'5px'}}>
            <Box >
              <Typography variant="subtitle1">
                ชื่อนามสกุล: 
              </Typography>
            </Box>
            <Box>
            <Typography variant="subtitle1">
            {IdUser === ''? "ไม่มีข้อมูล" : IdUser[0].FName_Person} {IdUser === ''? "ไม่มีข้อมูล" : IdUser[0].LName_Person}
              </Typography>
            </Box>
           </Box>
           <Box sx={{display:'flex',color:'#000000',margin:'5px'}}>
            <Box >
              <Typography variant="subtitle1">
                วัน/เดือน/ปีเกิด: 
              </Typography>
            </Box>
            <Box>
            <Typography variant="subtitle1">
            {IdUser === ''? "ไม่มีข้อมูล" : thaiDate}
              </Typography>
            </Box>
           </Box>
           <Box sx={{display:'flex',color:'#000000',margin:'5px'}}>
            <Box >
              <Typography variant="subtitle1">
                เบอร์โทรศัพท์: 
              </Typography>
            </Box>
            <Box>
            <Typography variant="subtitle1">
            {IdUser === ''? "ไม่มีข้อมูล" : IdUser[0].Phone_Person}
              </Typography>
            </Box>
           </Box>
           <Box sx={{display:'flex',color:'#000000',margin:'5px'}}>
            <Box >
              <Typography variant="subtitle1">
              ปริมาณแอลกอฮอร์วันนี้: 
              </Typography>
            </Box>
            <Box>
            <Typography variant="subtitle1">
            {IdUser === ''? "ไม่มีข้อมูล" : totalAlcoholBeverage} มิลลิกรัม
              </Typography>
            </Box>
           </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to="/PageEditUserPerson" style={{textDecoration: 'none'}}><ColorButton  sx={{color:'#ffffff'}}>แก้ไขข้อมูล</ColorButton></Link>
        </DialogActions>
      </Dialog>
          

        </Toolbar>
      </Container>
    </AppBar>



           
            <Box sx={{
            width:{lg:'90vw',md:'90vw',sm:'90vw',xs:'90vw'},
            height:{lg:'80vh',md:'80vh',sm:'100',xs:'100'},
            backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
            borderRadius: "10px",
            padding: "20px",
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            marginTop:'50px'
          }}>
<Box>
<Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              fontFamily: 'kanit',
              fontWeight: 400,
              color: '#ffffff',
            }}
          >
            เมนู
          </Typography>
</Box>

{
            
            
           
            Menus === "กรีนมาการิต้า" ||
            Menus === "kritika" ||
            Menus === "กินมาการิต้า" ||
            Menus === "Green margarita" ||
            Menus === "Green macarena" ||
            Menus === "Green mustika" ||
            Menus === "khemika" ||
            Menus === "Green macarena" ||
            Menus === "alita" ||
            Menus === "ปีนมาการิต้า" ||
            Menus === "drosera" ||
            Menus === "จีนมาการิต้า" ||
            Menus === "มาการิต้า"||
            Menus === "กริชมาการิต้า"? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  สแกนเพื่อสั่งเมนู green margarita
                </Typography>
                <Box sx={{ mt: 2 }}>
              
                  <QRCodeCanvas
                  
                    value="green margaritaLogin"
                    size={300}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    imageSettings={{
                      src: "https://campus.campus-star.com/app/uploads/2015/06/%E0%B8%95%E0%B8%A3%E0%B8%B2-%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1-.png",
                      x: undefined,
                      y: undefined,
                      height: 50,
                      width: 50,
                      excavate: true,
                    }}
                  />
                </Box>
              </Box>
            ) : 
              Menus === "โทรหา y" ||
              Menus === "Yellow howard" ||
              Menus === "Hello Hawaii" ||
              Menus === "Yellow ฮาวาย" ||
              Menus === "Yellow Car wilde" ||
              Menus === "Hello How are you" ||
              Menus === "Yellow Car WiFi" ||
              Menus === "Yellow Hawaii"?
              (
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    สแกนเพื่อสั่งเมนู Yellow Hawaii
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                
                    <QRCodeCanvas
                    
                      value="Yellow HawaiiLogin"
                      size={300}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={false}
                      imageSettings={{
                        src: "https://campus.campus-star.com/app/uploads/2015/06/%E0%B8%95%E0%B8%A3%E0%B8%B2-%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1-.png",
                        x: undefined,
                        y: undefined,
                        height: 50,
                        width: 50,
                        excavate: true,
                      }}
                    />
                  </Box>
                </Box>
              ) :
              
                Menus === "Kamikaze" ||
                Menus === "ถ้ามีคาราโอเกะ" ||
                Menus === "คามิคาเซ่" ||
                Menus === "เขามีคัทซี" ||
                Menus === "คามิกาเซ่ที่" ||
                Menus === "คามิกาเซ่" ?
                (
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      สแกนเพื่อสั่งเมนู Kamikaze
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                  
                      <QRCodeCanvas
                      
                        value="KamikazeLogin"
                        size={300}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        imageSettings={{
                          src: "https://campus.campus-star.com/app/uploads/2015/06/%E0%B8%95%E0%B8%A3%E0%B8%B2-%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1-.png",
                          x: undefined,
                          y: undefined,
                          height: 50,
                          width: 50,
                          excavate: true,
                        }}
                      />
                    </Box>
                  </Box>
                ) :
                
                  Menus === "Red Lady" ||
                  Menus === "เรดเลดี้" ||
                  Menus === "ready" ||
                  Menus === "lecithin e" ||
                  Menus === "westworld" ||
                  Menus === "เดดไลน์ที่" ||
                  Menus === "Red suede" ?
                  (
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        สแกนเพื่อสั่งเมนู Red Lady
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                    
                        <QRCodeCanvas
                        
                          value="Red LadyLogin"
                          size={300}
                          bgColor={"#ffffff"}
                          fgColor={"#000000"}
                          level={"L"}
                          includeMargin={false}
                          imageSettings={{
                            src: "https://campus.campus-star.com/app/uploads/2015/06/%E0%B8%95%E0%B8%A3%E0%B8%B2-%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1-.png",
                            x: undefined,
                            y: undefined,
                            height: 50,
                            width: 50,
                            excavate: true,
                          }}
                        />
                      </Box>
                    </Box>
                  ) :
                  
                    Menus === "วิสกี้ตุ๊ก" ||
                    Menus === "resolve" ||
                    Menus === "วิสกี้ซุป" ||
                    Menus === "มิกกี้ซุป" ||
                    Menus === "วิกกี้ซุป" ||
                    Menus === "Nikki sixx" ||
                    Menus === "วิธีสูบ" ||
                    Menus === "วิสกี้ Super" ||
                    Menus === "Whiskey ซุป" ||
                    Menus === "วิสกี้ sueb" ||
                    Menus === "มิกกี้ซุป" ||
                    Menus === "Redtube" ||
                    Menus === "whiskas" ||
                    Menus === "vislube" ||
                    Menus === "วิสกี้ superb" ||
                    Menus === "วิธีซุป" ||
                    Menus === "windshield" 
                    ?
                    (
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          สแกนเพื่อสั่งเมนู wiskey soup
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                      
                          <QRCodeCanvas
                          
                            value="wiskey"
                            size={300}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                            imageSettings={{
                              src: "https://campus.campus-star.com/app/uploads/2015/06/%E0%B8%95%E0%B8%A3%E0%B8%B2-%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1-.png",
                              x: undefined,
                              y: undefined,
                              height: 50,
                              width: 50,
                              excavate: true,
                            }}
                          />
                        </Box>
                      </Box>
                    ) 
                            
                            
                               :
                              ""

            }

<Box sx={{marginTop:'20px',width:'100%',height:'100%',display:'flex',justifyContent: 'center',flexWrap:'wrap'}}>
        
        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={Yellow_Hawaii}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        YellowHawaii
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={Kamikaze}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        Kamikaze
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={Red_Lady}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        Red Lady
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={Whiskey_soup}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        Whiskey soup
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={Green_Magarita}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        Green Magarita
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={แดงมะนาวโซดา}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        แดงมะนาวโซดา
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={เขียวมะนาวโซดา}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        เขียวมะนาวโซดา
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={สับปะรดมะนาวโซดา}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        สับปะรดมะนาวโซดา
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={แดงโซดา}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        แดงโซดา
        </Typography>
      </CardContent>
    </Card>
        </Box>

        <Box sx={{ width:{lg:'15vw',md:'15vw',sm:'30vw',xs:'30vw'},
              height:{lg:'30vh',md:'15vh',sm:'40vh',xs:'20vh'}, margin:'10px'}}>
        <Card sx={{ backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
            boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",}}>
      <CardMedia
        sx={{height:{lg:'20vh',md:'20vh',sm:'30vh',xs:'10vh'},}}
        image={เขียวโซดา}
      />
      <CardContent>
        <Typography gutterBottom  sx={{color:'#ffffff',textAlign:'center',fontSize:{lg:'22px',md:'16px',sm:'16px',xs:'12px'}}}>
        เขียวโซดา
        </Typography>
      </CardContent>
    </Card>
        </Box>

       
        
          
            

</Box>
            </Box>
            <Footer />
      </Box>
</ThemeProvider>
    </>
  )
}

export default PageSelectBeverage