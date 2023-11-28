import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, Typography, Box } from "@mui/material";
import NavbarLogin from "../components/NavbarLogin";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Yellow_Hawaii from "../imgs/Yellow_Hawaii.jpg";
import Kamikaze from "../imgs/Kamikaze.jpg";
import Red_Lady from "../imgs/Red_Lady.jpg";
import Whiskey_soup from "../imgs/Whiskey_soup.jpg";
import Green_Magarita from "../imgs/Green_Magarita.jpg";
import แดงมะนาวโซดา from "../imgs/แดงมะนาวโซดา.jpg";
import เขียวมะนาวโซดา from "../imgs/เขียวมะนาวโซดา.jpg";
import สับปะรดมะนาวโซดา from "../imgs/สับปะรดมะนาวโซดา.png";
import แดงโซดา from "../imgs/แดงโซดา.jpg";
import เขียวโซดา from "../imgs/เขียวโซดา.jpg";
import { io } from "socket.io-client";
import Footer from "../components/Footer";
import { QRCodeCanvas } from "qrcode.react";
import { ToastContainer, toast, Zoom } from 'react-toastify'
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

function PageSelectBeverageLogin() {






  
  const [Menu, setMenu] = React.useState("");
  const [Succ, setSucc] = React.useState("");
  console.log('Succ',Succ);
  const [alerts, setAlerts] = useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => (xxx === true ? true : false);
  const xxx = Menu === "เรดเลดี้" ? true : false;
  const yyy = xxx === true ? true : false;
  console.log(Menu === "เรดเลดี้" ? true : false);
  const [toggleState, setToggleState] = useState(false);
  function handleToggle() {
    setToggleState(Menu === "เรดเลดี้" ? true : false);
  }

  React.useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("Menu", (data) => setMenu(data));
    socket.on("disconnect", () => setMenu("server disconnected"));
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
  
  React.useEffect(() => {
    if(Succ === 'success'){
      setAlerts(true);
      toast.success("เมนูเสร็จเรียบร้อย");
    }else{
      console.log("error")
    }
  }, [Succ]);
  

  return (
    <>
      <ThemeProvider theme={theme}>
      {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
      ) : (
        <></>
      )}
        <Box
          sx={{
            width: { lg: "100%", md: "100vw", sm: "100vw", xs: "100vw" },
            height: { lg: "113vh", md: "113vh", sm: "100%", xs: "100%" },
            background:
              "linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <NavbarLogin />
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
            <Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  fontFamily: "kanit",
                  fontWeight: 400,
                  color: "#ffffff",
                }}
              >
                เมนู
              </Typography>
            </Box>

            {
            
            
           
            Menu === "กรีนมาการิต้า" ||
            Menu === "kritika" ||
            Menu === "กินมาการิต้า" ||
            Menu === "Green margarita" ||
            Menu === "Green macarena" ||
            Menu === "Green mustika" ||
            Menu === "khemika" ||
            Menu === "Green macarena" ||
            Menu === "alita" ||
            Menu === "ปีนมาการิต้า" ||
            Menu === "drosera" ||
            Menu === "จีนมาการิต้า" ||
            Menu === "มาการิต้า"||
            Menu === "กริชมาการิต้า"? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  สแกนเพื่อสั่งเมนู green margarita
                </Typography>
                <Box sx={{ mt: 2 }}>
              
                  <QRCodeCanvas
                  
                    value="green margarita"
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
              Menu === "โทรหา y" ||
              Menu === "Yellow howard" ||
              Menu === "Hello Hawaii" ||
              Menu === "Yellow ฮาวาย" ||
              Menu === "Yellow Car wilde" ||
              Menu === "Hello How are you" ||
              Menu === "Yellow Car WiFi" ||
              Menu === "Yellow Hawaii"?
              (
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    สแกนเพื่อสั่งเมนู Yellow Hawaii
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                
                    <QRCodeCanvas
                    
                      value="Yellow Hawaii"
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
              
                Menu === "Kamikaze" ||
                Menu === "ถ้ามีคาราโอเกะ" ||
                Menu === "คามิคาเซ่" ||
                Menu === "เขามีคัทซี" ||
                Menu === "คามิกาเซ่ที่" ||
                Menu === "คามิกาเซ่" ?
                (
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      สแกนเพื่อสั่งเมนู Kamikaze
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                  
                      <QRCodeCanvas
                      
                        value="Kamikaze"
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
                
                  Menu === "Red Lady" ||
                  Menu === "เรดเลดี้" ||
                  Menu === "ready" ||
                  Menu === "lecithin e" ||
                  Menu === "westworld" ||
                  Menu === "เดดไลน์ที่" ||
                  Menu === "Red suede" ?
                  (
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        สแกนเพื่อสั่งเมนู Red Lady
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                    
                        <QRCodeCanvas
                        
                          value="Red Lady"
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
                  
                    Menu === "วิสกี้ตุ๊ก" ||
                    Menu === "resolve" ||
                    Menu === "วิสกี้ซุป" ||
                    Menu === "มิกกี้ซุป" ||
                    Menu === "วิกกี้ซุป" ||
                    Menu === "Nikki sixx" ||
                    Menu === "วิธีสูบ" ||
                    Menu === "วิสกี้ Super" ||
                    Menu === "Whiskey ซุป" ||
                    Menu === "วิสกี้ sueb" ||
                    Menu === "มิกกี้ซุป" ||
                    Menu === "Redtube" ||
                    Menu === "whiskas" ||
                    Menu === "vislube" ||
                    Menu === "วิสกี้ superb" ||
                    Menu === "วิธีซุป" ||
                    Menu === "windshield" 
                    ?
                    (
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          สแกนเพื่อสั่งเมนู wiskey soup
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                      
                          <QRCodeCanvas
                          
                            value="wiskey soup"
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
                      Menu === "แดงมะนาวโซดา" 
                      ?
                      (
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            สแกนเพื่อสั่งเมนู แดงมะนาวโซดา
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                        
                            <QRCodeCanvas
                            
                              value="แดงมะนาวโซดา"
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
                      
                        Menu === "เขียวมะนาวโซดา" 
                        ?
                        (
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              สแกนเพื่อสั่งเมนู เขียวมะนาวโซดา
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                          
                              <QRCodeCanvas
                              
                                value="เขียวมะนาวโซดา"
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
                        
                          Menu === "สับปะรดมะนาวโซดา" 
                          ?
                          (
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                สแกนเพื่อสั่งเมนู สับปะรดมะนาวโซดา
                              </Typography>
                              <Box sx={{ mt: 2 }}>
                            
                                <QRCodeCanvas
                                
                                  value="สับปะรดมะนาวโซดา"
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
                          
                            Menu === "แดงโซดา" 
                            ?
                            (
                              <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                  สแกนเพื่อสั่งเมนู แดงโซดา
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                              
                                  <QRCodeCanvas
                                  
                                    value="แดงโซดา"
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
                            
                              Menu === "เขียวโซดา" 
                              ?
                              (
                                <Box sx={style}>
                                  <Typography id="modal-modal-title" variant="h6" component="h2">
                                    สแกนเพื่อสั่งเมนู เขียวโซดา
                                  </Typography>
                                  <Box sx={{ mt: 2 }}>
                                
                                    <QRCodeCanvas
                                    
                                      value="เขียว โซดา"
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
                              ""

            }

            <Box
              sx={{
                marginTop: "20px",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={Yellow_Hawaii}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      YellowHawaii
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={Kamikaze}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      Kamikaze
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={Red_Lady}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      Red Lady
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={Whiskey_soup}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      Whiskey soup
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={Green_Magarita}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      Green Magarita
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={แดงมะนาวโซดา}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      แดงมะนาวโซดา
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={เขียวมะนาวโซดา}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      เขียวมะนาวโซดา
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={สับปะรดมะนาวโซดา}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      สับปะรดมะนาวโซดา
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={แดงโซดา}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
                      แดงโซดา
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  width: { lg: "15vw", md: "15vw", sm: "30vw", xs: "30vw" },
                  height: { lg: "30vh", md: "15vh", sm: "40vh", xs: "20vh" },
                  margin: "10px",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                    boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: {
                        lg: "20vh",
                        md: "20vh",
                        sm: "30vh",
                        xs: "10vh",
                      },
                    }}
                    image={เขียวโซดา}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontSize: {
                          lg: "22px",
                          md: "16px",
                          sm: "16px",
                          xs: "12px",
                        },
                      }}
                    >
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
  );
}

export default PageSelectBeverageLogin;
