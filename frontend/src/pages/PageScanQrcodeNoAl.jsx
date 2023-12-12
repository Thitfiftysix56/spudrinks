import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Html5QrcodeScanner } from 'html5-qrcode';
import { createTheme, ThemeProvider, Typography, Box } from "@mui/material";
import Axios from "axios";
import QrReader from "react-qr-scanner";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const theme = createTheme({
  typography: {
    fontFamily: ["Kanit", "cursive"].join(","),
  },
});

function PageScanQrCode() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("No result");
  const navigate = useNavigate();
  const location = useLocation();
  const IdUser = JSON.parse(localStorage.getItem("user"));
  const { from, userid } = location.state;
  const [sumAlgohol, setSumAlgohol] = useState([]);
  const [volume, setVolume] = useState([]);
  // console.log("volume", volume);


  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/GetBottleVolume`)
      .then((res) => {
        setVolume(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleScan = (data) => {
    if (data) {
      if (
        data.text === "Yellow Hawaii" ||
        data.text === "Kamikaze" ||
        data.text === "Red Lady" ||
        data.text === "wiskey soup" ||
        data.text === "green margarita"
      ) {
        navigate("/PageLogin", { replace: true });
      } else {
        if (data.text === "แดงมะนาวโซดา") {
          Axios.post(process.env.REACT_APP_API + "/qrscan", {
            // qrData:result.text,
            qrData: data.text,
            userid: userid,
            // munu:data.text,
            bottom1: volume[0].Volume_Bottle - 90,
            bottom2: volume[1].Volume_Bottle,
            bottom3: volume[2].Volume_Bottle,
            bottom4: volume[3].Volume_Bottle - 30,
            bottom5: volume[4].Volume_Bottle - 60,
            bottom6: volume[5].Volume_Bottle,
          })
            .then((response) => {})
            .catch((error) => {
              // Handle any error that occurred during the request
              console.error(error);
            });
          navigate("/", { replace: true });
        } else if (data.text === "เขียวมะนาวโซดา") {
          Axios.post(process.env.REACT_APP_API + "/qrscan", {
            // qrData:result.text,
            qrData: data.text,
            userid: userid,
            // munu:data.text,
            bottom1: volume[0].Volume_Bottle,
            bottom2: volume[1].Volume_Bottle - 90,
            bottom3: volume[2].Volume_Bottle,
            bottom4: volume[3].Volume_Bottle - 30,
            bottom5: volume[4].Volume_Bottle - 60,
            bottom6: volume[5].Volume_Bottle,
          })
            .then((response) => {})
            .catch((error) => {
              // Handle any error that occurred during the request
              console.error(error);
            });
          navigate("/", { replace: true });
        } else if (data.text === "สับปะรดมะนาวโซดา") {
          Axios.post(process.env.REACT_APP_API + "/qrscan", {
            // qrData:result.text,
            qrData: data.text,
            userid: userid,
            // munu:data.text,
            bottom1: volume[0].Volume_Bottle,
            bottom2: volume[1].Volume_Bottle,
            bottom3: volume[2].Volume_Bottle - 90,
            bottom4: volume[3].Volume_Bottle - 30,
            bottom5: volume[4].Volume_Bottle - 60,
            bottom6: volume[5].Volume_Bottle,
          })
            .then((response) => {})
            .catch((error) => {
              // Handle any error that occurred during the request
              console.error(error);
            });
          navigate("/", { replace: true });
        } else if (data.text === "แดงโซดา") {
          Axios.post(process.env.REACT_APP_API + "/qrscan", {
            // qrData:result.text,
            qrData: data.text,
            userid: userid,
            // munu:data.text,
            bottom1: volume[0].Volume_Bottle - 90,
            bottom2: volume[1].Volume_Bottle,
            bottom3: volume[2].Volume_Bottle,
            bottom4: volume[3].Volume_Bottle - 30,
            bottom5: volume[4].Volume_Bottle,
            bottom6: volume[5].Volume_Bottle,
          })
            .then((response) => {})
            .catch((error) => {
              // Handle any error that occurred during the request
              console.error(error);
            });
          navigate("/", { replace: true });
        } else if (data.text === "เขียวโซดา") {
          Axios.post(process.env.REACT_APP_API + "/qrscan", {
            // qrData:result.text,
            qrData: data.text,
            userid: userid,
            // munu:data.text,
            bottom1: volume[0].Volume_Bottle,
            bottom2: volume[1].Volume_Bottle - 90,
            bottom3: volume[2].Volume_Bottle,
            bottom4: volume[3].Volume_Bottle - 30,
            bottom5: volume[4].Volume_Bottle,
            bottom6: volume[5].Volume_Bottle,
          })
            .then((response) => {})
            .catch((error) => {
              // Handle any error that occurred during the request
              console.error(error);
            });
          navigate("/", { replace: true });
        }
      }
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#ffffff"),
    backgroundColor: "#f54960",
    "&:hover": {
      backgroundColor: "#ed3867",
    },
  }));

  

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: { lg: "100vw", md: "100vw", sm: "100vw", xs: "100vw" },
            height: { lg: "100vh", md: "100vh", sm: "100vh", xs: "100vh" },
            background:
              "linear-gradient(to bottom, #cc0079, #d40e75, #dc1a72, #e3256e, #e92f6a, #ed3867, #f14163, #f54960, #f8525c, #fb5c59, #fd6556, #ff6e53)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              QR Scanning Code
            </Typography>
          </Box>
          <Box>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
              facingMode="environment"
             
            />
            <p>Scanned data: {result.text}</p>
          </Box>
          <Box>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ColorButton
                sx={{ color: "#ffffff" }}
                startIcon={<ArrowBackIcon />}
                variant="contained"
              >
                BLACK
              </ColorButton>{" "}
            </Link>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default PageScanQrCode;
