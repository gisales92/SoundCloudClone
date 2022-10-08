import React, { useEffect, useState, useContext } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { SongListContext } from "../../context/SongList";
import "react-jinke-music-player/assets/index.css";

export function NewAudioPlayer() {
  const [songList, setSongList] = useContext(SongListContext);
  console.log(songList);
  return (
    <div className="audio-player-container">
      <div className="audio-player-outer">
        <ReactJkMusicPlayer
          theme="dark"
          showDownload={false}
          defaultPosition={{ bottom: 0 }}
          audioLists={songList}
        />
      </div>
    </div>
  );
}
