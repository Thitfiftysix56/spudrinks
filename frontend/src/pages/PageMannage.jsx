import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider, Typography,Box, } from '@mui/material';
import Axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import Footer from '../components/Footer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Logo_Spu from '../imgs/logo.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


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

  
  


function PageMannage() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [allUser, setAllUser] = useState([]);
  // const [status, setStatus] = useState('');
  const [alerts, setAlerts] = useState(false)
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);


  const handleChange = (event, cellValues) => {

    Axios.put(
      process.env.REACT_APP_API + `/UpdateStatus/${event.target.value}/${cellValues.row.ID_Person}`,)
      .then((res) => {
        setAlerts(true)
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
        navigate(0)
      })
      .catch((err) => {
        if(err.response.status === 400) {
          setAlerts(true)
          toast.error("กรุณาลองใหม่อีกครั้งใหม่เพื่อแก้ไขสิทธิ์");
          navigate(0)
        } else {
          console.log("err: ", err.response.data)
        }
        console.log(err.response)
      })
  };

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
  const Delete = (idUser) => {
     
      Axios.delete(process.env.REACT_APP_API + `/DeleteUser/${idUser.row.ID_Person}/${idUser.row.Image_Person}`)
      .then((res) => {
        setAlerts(true)
        toast.success("ระบบได้ทำลบข้อมูลเรียบร้อยแล้ว");
        setTimeout(function() {
          navigate(0)
          // localStorage.clear();
        }, 3000);
        // console.log(res)
         })
         .catch((err) => {
          if(err.response.status === 400) {
            toast.error("กรุณาลองใหม่อีกครั้ง");
            navigate(0)
          } else {
            console.log("err: ", err.response.data)
          }
        })
   
  }

  const logout = () => {
    setAlerts(true)
  toast.success("ระบบจะออกในอีก3วิ");
  setTimeout(function() {
    localStorage.clear();
    navigate('/')
  }, 3000);
}

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/MannageUser`)
      .then((res) => {
        setAllUser(res.data)  
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const IdUser = JSON.parse(localStorage.getItem('user'))

  const columns = [
    {
      field: 'id',
      headerAlign: 'center',
      headerName: 'ลำดับ',
      width: 60,align:'center',
     
    },
     {
        field: 'fullName',
        headerName: 'ชื่อ - นามสกุล',
        width: 160,
        headerAlign: 'center',
        valueGetter: (params) =>
          `${params.row.FName_Person || ''} ${params.row.LName_Person || ''}`,align:'center'
      },
          {
        field: 'Birthday_Person',
        headerName: 'วัน/เดือน/ปีเกิด',
        width: 150,headerAlign: 'center', align:'center',
        renderCell: (cellValues) => {
        
          return (
            <div
              style={{
                width: '100%',
                textAlign: 'center',
              }}
            >
              {cellValues.value}
            </div>
          )
        },
      },
        {
        field: 'Phone_Person',
        headerName: 'เบอร์โทรศัพท์',
        width: 200,headerAlign: 'center', align:'center'
      },
          {
        field: 'alcohol',
        headerName: 'ปริมาณแอลกอฮอร์วันนี้',
        width: 150,headerAlign: 'center', align:'center'
      },
          {
        field: 'Status_Person',
        headerName: 'สิทธิการเข้าถึง',
        width: 150,headerAlign: 'center', align:'center',
        renderCell: (cellValues) => {
            return (
              <>
              <FormControl fullWidth >
          <Select
          sx={{color:'#ffffff'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={cellValues.value}
            onChange={(event ) => handleChange(event, cellValues)}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Beverage">Beverage</MenuItem>
          </Select>
        </FormControl>
              </>
            )
        }
      },
        {
          field: 'edit',
          headerName: 'แก้ไขข้อมูล',
          width: 130,headerAlign: 'center', align:'center',
          renderCell: (cellValues) => {
            
              return (
                <Link to="/PageEditUser" state={cellValues.row}  style={{textDecoration: 'none'}}>
                    <EditIcon  sx={{cursor:'pointer' ,color:'#ffffff'}} />
                </Link>
              )
          }
        },
            {
          field: 'delete',
          headerName: 'ลบ',
         headerAlign: 'center', align:'center',
          width: 130,
          renderCell: (cellValues) => {
              return (
                  <DeleteForeverIcon sx={{cursor:'pointer'}} onClick={() => Delete(cellValues)}/>
              )
          }
          // editable: true,
        },
  ]

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
            
            
            {/* <Navbar /> */}
           
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
            {IdUser === ''? "ไม่มีข้อมูล" : IdUser[0].Birthday_Person}
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
            {IdUser === ''? "ไม่มีข้อมูล" : IdUser[0].alcohol} มิลลิกรัม
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
            height:{lg:'80vh',md:'80vh',sm:'70vh',xs:'60vh'},
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
            จัดการสมาชิก
          </Typography>
</Box>
<Box sx={{ height: '100%', width: '100%' ,marginTop:'10px'}}>
<DataGrid
                  getRowId={(row) => row.ID_Person}
                  rows={allUser}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  sx={{
                    '& .MuiDataGrid-cell:': {
                      color: '#ffffff',
                    },
                    color:'#ffffff'
                  }}
                />
    </Box>

            </Box>
            <Box>

            </Box>
  
            <Footer />
      </Box>
</ThemeProvider>
    </>
  )
}

export default PageMannage