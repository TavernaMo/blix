import React, { memo, useMemo, useEffect, useState, useCallback } from "react";
import MusicCard from "../../components/music-card/music-card";
import "./playlist.scss";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const Playlist = memo(() => {
  const location = useLocation();

  const [audioList, setAudioList] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state.data) setAudioList(location.state.data);
  }, [location, location.state.data]);

  const renderMusicCardsList = useMemo(() => {
    return audioList?.songs?.map((record, index) => {
      return (
        <MusicCard
          key={index.toString()}
          image={record?.image}
          audio={record?.audio}
          description={record?.description}
        />
      );
    });
  }, [audioList]);

  const goBackCallback = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div className={"container"}>
      <Typography className={"title"}>Album Name: {audioList.title}</Typography>
      <button className={"goBackButton"} onClick={goBackCallback}>
        Go to Album List
      </button>
      <div className={"cardsContainer"}>{renderMusicCardsList}</div>
    </div>
  );
});

export default Playlist;
