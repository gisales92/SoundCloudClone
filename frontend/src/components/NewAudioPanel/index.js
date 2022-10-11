import React, { useEffect, useContext } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { SongListContext } from "../../context/SongList";
import "react-jinke-music-player/assets/index.css";

export function NewAudioPlayer() {
  let [songList, setSongList] = useContext(SongListContext);
  return (
    <div className="audio-player-container">
      <div className="audio-player-outer">
        <ReactJkMusicPlayer
          theme="dark"
          showDownload={false}
          defaultPosition={{ bottom: 5, left: 5 }}
          audioLists={songList}
          mode="full"
          onAudioListsChange={(id, list, info) => {
            setSongList([...list]);
            return;
          }}
          drag={false}
        />
      </div>
    </div>
  );
}
