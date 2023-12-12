import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, Typography, Box } from "@mui/material";
import Footer from "../components/Footer";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo_Spu from "../imgs/logo.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ffffff"),
  backgroundColor: "#f54960",
  "&:hover": {
    backgroundColor: "#ed3867",
  },
}));
const theme = createTheme({
  typography: {
    fontFamily: ["Kanit", "cursive"].join(","),
  },
});

function PageEditUserPerson() {
  const location = useLocation();
  const data = location.state;
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [nameAccount, setNameAccount] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [image_Person, setImage_Person] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    const formData = new FormData();
    formData.append(
      "firstName",
      firstName === "" ? data.FName_Person : firstName
    );
    formData.append("lastName", lastName === "" ? data.LName_Person : lastName);
    formData.append(
      "userName",
      userName === "" ? data.Username_Person : userName
    );
    // formData.append('passWord', passWord)
    formData.append(
      "nameAccount",
      nameAccount === "" ? data.NameAccount_Person : nameAccount
    );
    formData.append(
      "birthDay",
      birthDay === "" ? data.Birthday_Person : birthDay
    );
    formData.append(
      "numberPhone",
      numberPhone === "" ? data.Phone_Person : numberPhone
    );
    // formData.append('status_Person', status_Person)
    formData.append("filename", data.Image_Person);
    formData.append("file", image_Person);
    Axios.put(
      process.env.REACT_APP_API + `/EditUser/${data.ID_Person}`,
      formData
    )
      .then((res) => {
        setAlerts(true);
        toast.success("ระบบได้ทำการแก้ไขเรียบร้อยแล้ว");
        setTimeout(function () {
          navigate("/PageMannage");
          localStorage.clear();
        }, 3000);
        // console.log(res)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("กรุณาสมัครลองใหม่อีกครั้ง");
          navigate(0);
        } else {
          console.log("err: ", err.response.data);
        }
      });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (image_Person) {
      setImageUrl(URL.createObjectURL(image_Person));
    }
  }, [image_Person]);

  const logout = () => {
    setAlerts(true);
    toast.success("ระบบจะออกในอีก3วิ");
    setTimeout(function () {
      localStorage.clear();
      navigate("/");
    }, 3000);
  };

  const IdUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <ThemeProvider theme={theme}>
        {alerts ? (
          <ToastContainer
            draggable={false}
            transition={Zoom}
            autoClose={3000}
          />
        ) : (
          <></>
        )}
        <Box
          sx={{
            width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
            height: { lg: "150vh", md: "150vh", sm: "120vh", xs: "150vh" },
            background:
              "linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <NavbarLogin /> */}
          <AppBar
            position="static"
            sx={{
              background: "rgba(228 ,228 ,228 ,0.10)",
              boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
            }}
          >
            <Container maxWidth="xl">
              <Toolbar
                disableGutters
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "100%",
                    padding: "5px",
                    margin: "10px",
                  }}
                >
                  <img
                    src={Logo_Spu}
                    alt="ไม่มีรูปภาพ"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                      fontFamily: "kanit",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                      fontSize: {
                        lg: "24px",
                        md: "22px",
                        sm: "20px",
                        xs: "18px",
                      },
                      marginLeft: { lg: "30px", md: "0", sm: "0", xs: "0" },
                    }}
                  >
                    SPU DRINKS
                  </Typography>
                </Box>

                {Location.pathname === "/PageLogin" ? (
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <ColorButton
                      sx={{ color: "#ffffff" }}
                      startIcon={<ArrowBackIcon />}
                      variant="contained"
                    >
                      BLACK
                    </ColorButton>{" "}
                  </Link>
                ) : (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            IdUser === ""
                              ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw0dST-nJEJhx9fmvvFjQ2BQ&ust=1683907508852000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiAr7nS7f4CFQAAAAAdAAAAABAE"
                              : require(`../../src/ImgPerson/uploads/${IdUser[0].Image_Person}`)
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleClickOpen}>
                        <Typography
                          textAlign="center"
                          sx={{ color: "#000000" }}
                        >
                          ดูข้อมูลผู้ใช้
                        </Typography>
                      </MenuItem>
                      {IdUser[0].Status_Person === "Admin" ? (
                        <MenuItem>
                          <Link
                            to="/PageMannage"
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            <Typography
                              textAlign="center"
                              sx={{ color: "#000000" }}
                            >
                              จัดการสมาชิก
                            </Typography>
                          </Link>
                        </MenuItem>
                      ) : (
                        ""
                      )}
                      <MenuItem>
                        <Link
                          to="/PageSelectBeverage"
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          <Typography
                            textAlign="center"
                            sx={{ color: "#000000" }}
                          >
                            กลับสู่หน้าหลัก
                          </Typography>
                        </Link>
                      </MenuItem>
                      {IdUser[0].Status_Person === "Admin" ? (
                        <MenuItem>
                          <Link
                            to="/PageMannageBeverage"
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            <Typography
                              textAlign="center"
                              sx={{ color: "#000000" }}
                            >
                              จัดการเครื่องดื่ม
                            </Typography>
                          </Link>
                        </MenuItem>
                      ) : (
                        ""
                      )}
                      <MenuItem>
                        <Typography
                          textAlign="center"
                          sx={{ color: "red" }}
                          onClick={() => logout()}
                        >
                          ออกจากระบบ
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                )}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      background: "rgba(228 ,228 ,228 ,0.9)",
                      boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                      borderStyle: "solid",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <DialogTitle
                    id="alert-dialog-title"
                    sx={{ textAlign: "center" }}
                  >
                    ข้อมูลส่วนตัว
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ margin: "5px" }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            IdUser === ""
                              ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw0dST-nJEJhx9fmvvFjQ2BQ&ust=1683907508852000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiAr7nS7f4CFQAAAAAdAAAAABAE"
                              : require(`../../src/ImgPerson/uploads/${IdUser[0].Image_Person}`)
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          color: "#000000",
                          margin: "5px",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            ชื่อบัญชีผู้ใช้:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1">
                            {IdUser === ""
                              ? "ไม่มีข้อมูล"
                              : IdUser[0].Username_Person}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          color: "#000000",
                          margin: "5px",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            ชื่อนามสกุล:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1">
                            {IdUser === ""
                              ? "ไม่มีข้อมูล"
                              : IdUser[0].FName_Person}{" "}
                            {IdUser === ""
                              ? "ไม่มีข้อมูล"
                              : IdUser[0].LName_Person}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          color: "#000000",
                          margin: "5px",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            วัน/เดือน/ปีเกิด:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1">
                            {IdUser === ""
                              ? "ไม่มีข้อมูล"
                              : IdUser[0].Birthday_Person}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          color: "#000000",
                          margin: "5px",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            เบอร์โทรศัพท์:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1">
                            {IdUser === ""
                              ? "ไม่มีข้อมูล"
                              : IdUser[0].Phone_Person}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          color: "#000000",
                          margin: "5px",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            ปริมาณแอลกอฮอร์วันนี้:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1">
                            {IdUser === "" ? "ไม่มีข้อมูล" : IdUser[0].alcohol}{" "}
                            มิลลิกรัม
                          </Typography>
                        </Box>
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Link
                      to="/PageEditUserPerson"
                      style={{ textDecoration: "none" }}
                    >
                      <ColorButton sx={{ color: "#ffffff" }}>
                        แก้ไขข้อมูล
                      </ColorButton>
                    </Link>
                  </DialogActions>
                </Dialog>
              </Toolbar>
            </Container>
          </AppBar>

          <Box
            sx={{
              width: { lg: "50vw", md: "60vw", sm: "60vw", xs: "80vw" },
              height: { lg: "120vh", md: "100vh", sm: "80vh", xs: "110vh" },
              backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
              boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "40px",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "kanit",
                  fontWeight: 400,
                  color: "#ffffff",
                }}
              >
                แก้ไขข้อมูลสมาชิก
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box sx={{ margin: "10px" }}>
                <Avatar
                  sx={{ width: "80px", height: "80px" }}
                  alt="ไม่มีรูป"
                  src={
                    imageUrl === null
                      ? require(`../../src/ImgPerson/uploads/${IdUser[0].Image_Person}`)
                      : imageUrl
                  }
                />
              </Box>
              <Box sx={{ margin: "10px" }}>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setImage_Person(e.target.files[0])}
                />
                {/* <label htmlFor="select-image">
                    <ColorButton variant="contained" sx={{color:'#ffffff'}} >เลือกรูปโปรไฟล์</ColorButton>

               </label> */}
                <label htmlFor="select-image">
                  <center>
                    <ColorButton
                      variant="contained"
                      sx={{ color: "#ffffff" }}
                      component="span"
                    >
                      กดเพื่ออัพโหลดรูปโปรไฟล์
                    </ColorButton>
                  </center>
                </label>
              </Box>
              <Box sx={{ margin: "10px", width: "100%" }}>
                <CssTextField
                  id="outlined-basic"
                  fullWidth
                  label="Username"
                  variant="outlined"
                  defaultValue={IdUser[0].Username_Person}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Box>

              <Box sx={{ margin: "10px", width: "100%" }}>
                <CssTextField
                  id="outlined-basic"
                  fullWidth
                  label="ชื่อบัญชีผู้ใช้งาน"
                  variant="outlined"
                  defaultValue={IdUser[0].NameAccount_Person}
                  onChange={(e) => setNameAccount(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: "10px", width: "100%" }}>
                <CssTextField
                  id="outlined-basic"
                  fullWidth
                  label="ชื่อ"
                  variant="outlined"
                  defaultValue={IdUser[0].FName_Person}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: "10px", width: "100%" }}>
                <CssTextField
                  id="outlined-basic"
                  fullWidth
                  label="นามสกุล"
                  variant="outlined"
                  defaultValue={IdUser[0].LName_Person}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: "10px", width: "100%" }}>
                <CssTextField
                  name="someDate"
                  label="เดือน/วัน/ปีเกิด"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  fullWidth
                  defaultValue={IdUser[0].Birthday_Person}
                  onChange={(e) => setBirthDay(e.target.value)}
                />
              </Box>
              <Box sx={{ margin: "10px", width: "100%" }}>
                <CssTextField
                  id="outlined-basic"
                  fullWidth
                  label="เบอร์โทรศัพท์"
                  variant="outlined"
                  defaultValue={IdUser[0].Phone_Person}
                  onChange={(e) => setNumberPhone(e.target.value)}
                />
              </Box>
              <Grid
                container
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ margin: "10px" }}
              >
                <Grid item xs={4} sm={8} md={6}>
                  <Box
                    sx={{
                      marginRight: { lg: "10px", md: "10px", sm: 0, xs: 0 },
                      marginTop: { lg: "0", md: "0", sm: "10px", xs: "10px" },
                    }}
                  >
                    <Link
                      to="/PageSelectBeverage"
                      style={{ textDecoration: "none" }}
                    >
                      <ColorButton
                        fullWidth
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        sx={{ color: "#ffffff" }}
                      >
                        BLACK
                      </ColorButton>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={6}>
                  <Box
                    sx={{
                      marginLeft: { lg: "10px", md: "10px", sm: 0, xs: 0 },
                      marginTop: { lg: "0", md: "0", sm: "10px", xs: "10px" },
                    }}
                  >
                    <ColorButton
                      fullWidth
                      variant="contained"
                      sx={{ color: "#ffffff" }}
                      onClick={() => submit()}
                    >
                      แก้ไขข้อมูล
                    </ColorButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default PageEditUserPerson;
