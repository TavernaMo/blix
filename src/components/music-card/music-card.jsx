import React, { memo, useCallback, useMemo, useState } from "react";
import "./music-card.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PropTypes from "prop-types";
import PauseIcon from "@mui/icons-material/Pause";
import { useNavigate } from "react-router";

const MusicCard = memo(
  ({ image, audio, description, imageWidth, navigateFunc }) => {
    const [isPlaySong, setIsPlaySong] = useState(false);
    const song = useMemo(() => {
      return new Audio(audio);
    }, [audio]);

    const navigate = useNavigate();

    const onPlay = useCallback(async () => {
      if (song) {
        song?.play();
        setIsPlaySong(true);
        song.onended = () => {
          setIsPlaySong(false);
        };
      }
    }, [song]);

    const stopPlaying = useCallback(() => {
      if (song) {
        song.pause();
        setIsPlaySong(false);
      }
    }, [song]);

    const refToRecordCallback = useCallback(
      (image, audio, description) => () => {
        stopPlaying();
        navigate("/record", { state: { image, audio, description } });
      },
      [stopPlaying]
    );

    return (
      <Card className={"cardContainer"}>
        <CardMedia
          component="img"
          className={"image"}
          style={{ width: imageWidth }}
          image={image}
          onClick={
            navigateFunc
              ? navigateFunc
              : refToRecordCallback(image, audio, description)
          }
        />
        <div className={"playerContainer"}>
          <CardContent className={"cardContent"}>
            <Typography className={"titleCard"}>{description}</Typography>
            <IconButton onClick={isPlaySong ? stopPlaying : onPlay}>
              {isPlaySong ? (
                <PauseIcon className={"navigationIcon"} />
              ) : (
                <PlayArrowIcon className={"navigationIcon"} />
              )}
            </IconButton>
          </CardContent>
        </div>
      </Card>
    );
  }
);

MusicCard.defaultProps = {
  imageWidth: "300px",
};

MusicCard.propTypes = {
  image: PropTypes.string,
  audio: PropTypes.string,
  description: PropTypes.string,
  imageWidth: PropTypes.string,
  navigateFunc: PropTypes.string,
};

export default MusicCard;
