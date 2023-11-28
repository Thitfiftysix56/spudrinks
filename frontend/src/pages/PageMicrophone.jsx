import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { createTheme, ThemeProvider, Typography, Box } from "@mui/material";
import { Button, TextField, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Axios from "axios";
import SosIcon from "@mui/icons-material/Sos";
import MicIcon from "@mui/icons-material/Mic";
import Emer from "../emergency/emergency-alarm-with-reverb-29431.mp3";
import { ToastContainer, toast, Zoom } from "react-toastify";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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

function PageMicrophone() {
  const audioRef = useRef(null);
  const [isToggled, setIsToggled] = useState(false);
  const [sos, setSos] = useState("sos");
  const [isLooping, setIsLooping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  // const [transcriptmic, setTranscriptmic] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  React.useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    // socket.on("Menu", (data) => setMenus(data));
    // socket.on("disconnect", () => setMenus("server disconnected"));
  }, []);

 

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

 

  const Sos = () => {
    resetTranscript()
    if (isToggled) {
      audioRef.current.pause();
      setSos(sos === "sos" ? "nosos" : "sos");
      Axios.post(process.env.REACT_APP_API + '/sos', {
        SOS:sos,
     
       } )
            .then((response) => {
             
            })
            .catch((error) => {
              // Handle any error that occurred during the request
              console.error(error);
            });
    } else {
      audioRef.current.play();
      setSos(sos === "sos" ? "nosos" : "sos");
      Axios.post(process.env.REACT_APP_API + '/sos', {
        SOS:sos,
     
       } )
            .then((response) => {
             
            })
            .catch((error) => {
              // Handle any error that occurred during the request
              console.error(error);
            });
      toggleLoop();
    }
    setIsToggled(!isToggled);
    // setSos("sos");
  };
  const toggleLoop = () => {
    audioRef.current.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  if(transcript !== ''){
Axios.post(process.env.REACT_APP_API + '/qrscan', {
    // SOS:sos,
    Transcript:transcript
   } )
        .then((response) => {
         
        })
        .catch((error) => {
          // Handle any error that occurred during the request
          console.error(error);
        });
  }

  console.log("transcript",transcript)
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: { lg: "100%", md: "100vw", sm: "100vw", xs: "100vw" },
            height: { lg: "100vh", md: "100vh", sm: "100%", xs: "100%" },
            background:
              "linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Navbar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontSize: {
                  lg: 20,
                  md: 20,
                  sm: 15,
                  xs: 15,
                },
                color: "red",
              }}
            >
              <Box sx={{ display: "none" }}>
                <audio ref={audioRef} src={Emer} />
              </Box>
              {isToggled === false ? (
                ""
              ) : (
                <Box
                  className={`bouncing-text`}
                  sx={{
                    width: "200px",
                    height: "100px",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <SosIcon sx={{ width: "100px", height: "100px" }} />
                </Box>
              )}
            </Typography>
            <Typography
              gutterBottom
              sx={{
                fontSize: {
                  lg: 20,
                  md: 20,
                  sm: 15,
                  xs: 15,
                },
                color: "#ffffff",
              }}
            >
              การใช้งาน : กดปุ่ม "ไมโครโฟน" เพื่อป้อนชุดคำสั่งเสี่ยงที่ต้องการ
            </Typography>
            <Typography
              gutterBottom
              sx={{
                fontSize: {
                  lg: 20,
                  md: 20,
                  sm: 15,
                  xs: 15,
                },
                color: "#ffffff",
              }}
            >
              Microphone : {listening ? "on" : "off"}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ margin: "10px" }}>
                <ColorButton
                  fullWidth
                  variant="contained"
                  sx={{ color: "#ffffff", width: "150px", height: "150px" }}
                  onClick={SpeechRecognition.startListening}
                  // onClick={Listening}
                >
                  <MicIcon sx={{ width: "100px", height: "100px" }} />
                </ColorButton>
              </Box>
              <Box sx={{ margin: "10px" }}>
                <ColorButton
                  fullWidth
                  variant="contained"
                  sx={{ color: "#ffffff", width: "150px", height: "150px" }}
                  onClick={() => Sos()}
                >
                  <SosIcon sx={{ width: "100px", height: "100px" }} />
                </ColorButton>
              </Box>
            </Box>
          </Box>
          {/* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p> */}
      {/* <p>{transcript}</p> */}
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default PageMicrophone;
