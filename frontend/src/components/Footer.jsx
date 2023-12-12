import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo_Spu from "../imgs/logo.png";

function Footer() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "130px",
          backgroundColor: "rgba(228 ,228 ,228 ,0.10)",
          boxShadow: "0px 10px 15px 10px rgba(0 ,0 ,0 ,0.15)",
          marginTop: "51px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "#ffffff",
            borderRadius: "100%",
            padding: "5px",
            margin: "10px",
            width: "60px",
            height: "60px",
          }}
        >
          <img
            src={Logo_Spu}
            alt="ไม่มีรูปภาพ"
            style={{ width: "50px", height: "50px" }}
          />
        </Box>
        <Box>
          <Typography gutterBottom>
            DESIGN BY ARTHIT S. &reg; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
