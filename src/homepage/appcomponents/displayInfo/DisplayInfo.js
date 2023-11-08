import React, { useEffect, useState } from "react";
import "./DisplayInfo.css";
import { useDispatch, useSelector } from "react-redux";
import postalCodeSlice, { updateData } from "../../../RTK/postalCodeSlice";
import Loader from "../../sharedcomponents/Loader";
import Snackbarcomp from "../../sharedcomponents/Snackbar";
import { Button, Switch } from "@mui/material";

const DisplayInfo = () => {
  const [placesList, setPlacesList] = useState([]);
  const [switchValue, setSwitchvalue] = useState(false);
  const[showlist,setShowlist]=useState(false)

  const handleSwitch = (e) => {
    
    setSwitchvalue(() => !switchValue);
    setShowlist(!switchValue)
  };

  console.log(showlist,switchValue)

  let postalData;

  const dispatch = useDispatch();

  postalData = useSelector((state) => state.postalCodeSlice.postalData);
  let isLoading = useSelector((state) => state.postalCodeSlice.status);

  useEffect(() => {
    if (postalData && switchValue) setPlacesList([...placesList, postalData]);
  }, [postalData]);

  const isObject = typeof postalData;
if(placesList.length)
  console.log(placesList,placesList[0].country);

  return (
    <>
      <div style={{ color: "black" }}>
        Single
        <Switch
          value={switchValue}
          onChange={(e) => {
            console.log(e.target.value, "hi");
            handleSwitch(e);
          }}
        />
        List
      </div>

      <div
        className={
          postalData
            ? isObject === "object"
              ? `main green`
              : isObject === "string"
              ? `main red`
              : `main`
            : `main`
        }
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container1">
            {postalData ? (
              typeof postalData === "string" ? (
                <h2>{postalData}</h2>
              ) : (
                <>
                  {showlist ? (
                    <div className="container2">
                      {placesList.map((item, idx) => (
                        <li key={idx}>
                          <h5>country : {item?.country}</h5>
                          <h5>
                            state :{" "}
                            {item?.places?.length && item?.places[0]["state"]}
                          </h5>

                          <h5>
                            city :{" "}
                            {item?.places?.length &&
                              item?.places[0]["place name"]}
                          </h5>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <div className="container2">
                      <h2>country : {postalData?.country}</h2>
                      <h2>
                        state :{" "}
                        {postalData.places?.length &&
                          postalData?.places[0]["state"]}
                      </h2>

                      <h2>
                        city :{" "}
                        {postalData.places?.length &&
                          postalData?.places[0]["place name"]}
                      </h2>
                    </div>
                  )}
                </>
              )
            ) : (
              "enter pincode and press Enter to search"
            )}
          </div>
        )}
      </div>
      <Button
        sx={{ height: "56px", fontSize: "1.2rem" }}
        onClick={() => {
          dispatch(updateData(null));setPlacesList([])
        }}
      >
        clear
      </Button>
    </>
  );
};

export default DisplayInfo;
