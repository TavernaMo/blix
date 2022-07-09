import React, { memo, useCallback, useEffect, useMemo } from "react";
import "./albumList.scss";

import { getAlbumDataAsync } from "../../redux/album-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AlbumList = memo(() => {
  const { albumData } = useSelector((state) => state.albumData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAlbumDataAsync());
  }, [dispatch]);

  const refToPlayersCallback = useCallback(
    (dataAlbum) => () => {
      navigate("/playlist", { state: { data: dataAlbum } });
    },
    [navigate]
  );

  const renderAlbumRecord = useMemo(() => {
    return albumData.map((album) => {
      return (
        <div
          key={album?.id?.toString()}
          className={"cardContainer"}
          onClick={refToPlayersCallback(album)}
        >
          <div>
            <p>{album.title}</p>
            <p>Amount songs: {album.songs.length}</p>
          </div>
          <div>
            <img className={"albumImageContainer"} src={album.albumImage} />
          </div>
        </div>
      );
    });
  }, [albumData]);

  return (
    <div className={"albumListContainer"}>
      <h3 className={"albumTitle"}>Album list</h3>
      {renderAlbumRecord}
    </div>
  );
});

export default AlbumList;
