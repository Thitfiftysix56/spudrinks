import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo_Spu from "../imgs/logo.png";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

function NavbarLogin() {
  const [volume, setVolume] = useState([]);
  const location = useLocation();
  // console.log("location" , location.pathname)
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

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/GetBottleVolume`)
      .then((res) => {
        setVolume(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // console.log("volume", volume);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "rgba(228 ,228 ,228 ,0.10)",
          boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
                fontSize: { lg: "24px", md: "22px", sm: "20px", xs: "18px" },
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
                // to="/PageScanQrcodeNoAl"
                to={
                  volume[0]?.Volume_Bottle <= 30 ||
                  volume[1]?.Volume_Bottle <= 30 ||
                  volume[2]?.Volume_Bottle <= 30 ||
                  volume[3]?.Volume_Bottle <= 30 ||
                  volume[4]?.Volume_Bottle <= 30 ||
                  volume[5]?.Volume_Bottle <= 30
                    ? "/"
                    : "/PageScanQrcodeNoAl"
                }
                style={{ textDecoration: "none", color: "#ffffff" }}
                state={{ from: location.pathname }}
              >
                <IconButton
                  variant="contained"
                  sx={{
                    borderRadius: "50%",
                    width: "55px",
                    height: "55px",
                    backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
                  }}
                  className="blob"
                  onClick={handleClick}
                >
                  <QrCodeScannerIcon />
                </IconButton>
              </Link>

              {volume[0]?.Volume_Bottle <= 30 ||
              volume[1]?.Volume_Bottle <= 30 ||
              volume[2]?.Volume_Bottle <= 30 ||
              volume[3]?.Volume_Bottle <= 30 ||
              volume[4]?.Volume_Bottle <= 30 ||
              volume[5]?.Volume_Bottle <= 30 ? (
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
                    ไม่สามารถสั่งเครื่องดื่มได้เนื่องมีส่วนผสมบางตัวใกล้หมด
                  </Alert>
                </Snackbar>
              ) : (
                ""
              )}
            </Box>
            <Box>
              <Link
                to="/PageLogin"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <ColorButton
                  startIcon={<LoginIcon />}
                  sx={{ color: "#ffffff" }}
                >
                  Login
                </ColorButton>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavbarLogin;
