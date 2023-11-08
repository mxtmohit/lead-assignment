import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    
      <CircularProgress size="15rem" thickness={1.5} sx={{height:"500px",color:"white"}} />
    
  );
}
