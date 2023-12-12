import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
import { io } from "socket.io-client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo_Spu from "../imgs/logo.png";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "react-toastify/dist/ReactToastify.css";



const theme = createTheme({
  typography: {
    fontFamily: ["Kanit", "cursive"].join(","),
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ffffff"),
  backgroundColor: "#f54960",
  "&:hover": {
    backgroundColor: "#ed3867",
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PageMannageBeverage() {
  const IdUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const Location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [imgUser, setImgUser] = useState("");
  const [alerts, setAlerts] = useState(false);
  const [Menus, setMenus] = React.useState("");
  const [sumAlgohol, setSumAlgohol] = useState([]);
  const [volume, setVolume] = useState([]);
  const [Succ, setSucc] = React.useState("");
  // console.log("volume",volume)
  const chartData = {
    labels: volume.map((bottle) => bottle.Name_Bottle),
    datasets: [
      {
        label: "ปริมาณขวด",
        data: volume.map((bottle) => bottle.Volume_Bottle),
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.9)",
          "rgba(255, 159, 64, 0.9)",
        ],
        borderColor: [
          "rgba(0, 0, 0, 255)",
          "rgba(0, 0, 0, 255)",
          "rgba(0, 0, 0, 255)",
          "rgba(0, 0, 0, 255)",
          "rgba(0, 0, 0, 255)",
          "rgba(0, 0, 0, 255)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const handleBarClick = (event, elements) => {
    // if (elements.length > 0) {
    const clickedIndex = elements[0].index;
    const clickedBottle = volume[clickedIndex];
    // console.log(`Clicked on bottle with ID ${clickedBottle.id}: ${clickedBottle.Name_Bottle}`);
    Axios.put(process.env.REACT_APP_API + "/Addvolum", {
      id: clickedBottle.id,
      Name_Bottle: clickedBottle.Name_Bottle,
      volumbottom: 700,
    })
      .then((res) => {
        setAlerts(true);
        toast.success("ระบบได้ทำเพิ่มปริมาตรขวดเรียบร้อย");
        setTimeout(function () {
          navigate(0);
          // localStorage.clear();
        }, 3000);
        // console.log(res)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("กรุณาลองใหม่อีกครั้ง");
          navigate("/PageMannageBeverage");
        } else {
          console.log("err: ", err.response.data);
        }
      });
    // }
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "black", // สีของตัวอักษรบนแกน x
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "black", // สีของตัวอักษรบนแกน y
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "ปริมาณขวดต่อชนิดสินค้า",
        color: "black", // สีของตัวอักษรหัวข้อ
        font: {
          size: 16,
        },
      },
      legend: {
        labels: {
          color: "black", // สีของตัวอักษรใน label
        },
      },
    },
    onClick: handleBarClick,
  };
  let totalAlcoholBeverage = 0;

  for (const item of sumAlgohol) {
    totalAlcoholBeverage += item.Alcohol_Beverage;
  }

  const isoDate = IdUser[0].Birthday_Person;
  const jsDate = new Date(isoDate);
  const thaiDate = jsDate.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // console.log(thaiDate);

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
  const navigate = useNavigate();

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
    setAlerts(true);
    toast.success("ระบบจะออกในอีก3วิ");
    setTimeout(function () {
      localStorage.clear();
      navigate("/");
    }, 3000);
  };

  useEffect(() => {
    if (IdUser[0].ID_Person !== "") {
      Axios.get(
        process.env.REACT_APP_API + `/GetSumAlcohol/${IdUser[0].ID_Person}`
      )
        .then((res) => {
          setSumAlgohol(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/GetBottleVolume`)
      .then((res) => {
        setVolume(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    if (Succ === "success") {
      setAlerts(true);
      toast.success("เมนูเสร็จเรียบร้อย");
    } else {
      console.log("error");
    }
  }, [Succ]);
  const [openaaa, setOpenaaa] = React.useState(false);

  const handleClick = () => {
    setOpenaaa(true);
  };

  const handleCloseaaa = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenaaa(false);
  };

  // const ID_Person = JSON.parse(localStorage.getItem('ID_Person'))
  //  console.log(ID_Person)
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
            width: { lg: "100%", md: "100vw", sm: "100vw", xs: "100vw" },
            height: { lg: "120vh", md: "120vh", sm: "100%", xs: "100%" },
            background:
              "linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ marginRight: "20px" }}>
                    <Link
                      to={
                        totalAlcoholBeverage >= 36
                          ? "/PageSelectBeverage"
                          : "/PageScanQrCode"
                      }
                      style={{ textDecoration: "none", color: "#ffffff" }}
                      state={{
                        from: location.pathname,
                        userid: IdUser[0].ID_Person,
                        Algohol: IdUser[0].Alcohol_Beverage,
                      }}
                    >
                      <Tooltip title="Scan Qrcode">
                        <IconButton
                          variant="contained"
                          onClick={handleClick}
                          sx={{
                            borderRadius: "50%",
                            width: "55px",
                            height: "55px",
                            backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                          }}
                          className="blob"
                        >
                          <QrCodeScannerIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    {totalAlcoholBeverage >= 36 ? (
                      <Snackbar
                        open={openaaa}
                        autoHideDuration={2000}
                        onClose={handleCloseaaa}
                      >
                        <Alert
                          onClose={handleCloseaaa}
                          severity="error"
                          sx={{ width: "100%" }}
                        >
                          ไม่สามารถสั่งเครื่องดื่มได้เนื่องจากแอลกอฮอล์เกิน
                        </Alert>
                      </Snackbar>
                    ) : (
                      ""
                    )}
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
                </Box>

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
                            {IdUser === "" ? "ไม่มีข้อมูล" : thaiDate}
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
                            {IdUser === ""
                              ? "ไม่มีข้อมูล"
                              : totalAlcoholBeverage}{" "}
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
              width: { lg: "90vw", md: "90vw", sm: "90vw", xs: "90vw" },
              height: { lg: "80vh", md: "80vh", sm: "100", xs: "100" },
              backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
              boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "50px",
            }}
          >
           

           
            <Bar data={chartData} options={options} />

           
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default PageMannageBeverage;
