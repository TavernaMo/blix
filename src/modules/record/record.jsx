import React, { memo, useEffect, useState, useCallback } from "react";
import MusicCard from "../../components/music-card/music-card";
import { useLocation } from "react-router-dom";
import "./record.scss";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Record = memo(() => {
  const location = useLocation();
  const [dataCard, setDataCard] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setDataCard(location.state);
    }
  }, [location.state]);

  const goBackCallback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={"container"}>
      <Typography className={"title"}>Current Record</Typography>
      <button className={"goBackButton"} onClick={goBackCallback}>
        Go to Play List
      </button>
      <MusicCard
        image={dataCard?.image}
        audio={dataCard?.audio}
        description={dataCard?.description}
        imageWidth={"100%"}
      />
    </div>
  );
});

export default Record;
