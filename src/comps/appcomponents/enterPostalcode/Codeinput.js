import { Button, OutlinedInput, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Codeinput.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Loader, updateData } from "../../../RTK/postalCodeSlice";
import Snackbarcomp from "../../sharedcomponents/Snackbar";

  let snackbarMsg = "";
  let msgtype = "success";

const Codeinput = () => {
  const [Code, setCode] = useState("");
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);



  useEffect(() => {

    console.log(/^[0-9]+$/.test(Code));
    if (/^[0-9]+$/.test(Code) == true) {
      setIsCodeValid(true);
    } else {
      msgtype = "error";
      snackbarMsg = "cannot enter characters/spaces";
      //setsnackbarOpen(true);
      setIsCodeValid(false);
    }
  }, [Code]);

  const dispatch = useDispatch();

  const HandleResultSuccess = (res) => {
    dispatch(Loader(false));
    if (res.status == 200) {
      dispatch(updateData(res.data));
    }
  };

  const HandleError = (e) => {
    dispatch(Loader(false));
    dispatch(updateData("No places found try another Code"));
    if (e.status == 404) {
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(isCodeValid);
    if (isCodeValid) {
      dispatch(Loader(true));

      axios
        .get(`https://api.zippopotam.us/in/${Code}`)
        .then((result) => {
          HandleResultSuccess(result);
        })
        .catch((e) => {
          HandleError(e);
        });
    } else {
      
      msgtype="error"
      setsnackbarOpen(true);
    }
  };

  return (
    <div className="container">
      <form onSubmit={HandleSubmit}>
        <TextField
          value={Code}
          onChange={(e) => setCode(e.target.value)}
          label="Enter code"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          sx={{ height: "56px", fontSize: "1.2rem" }}
          type="submit"
          variant="outlined"
        >
          Search!
        </Button>
      </form>
      <Snackbarcomp
        message={snackbarMsg}
        type={msgtype}
        isOpen={snackbarOpen}
        setOpen={setsnackbarOpen}
      />
    </div>
  );
};

export default Codeinput;
