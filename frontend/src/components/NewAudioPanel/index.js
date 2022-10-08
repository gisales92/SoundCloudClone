import React, { useEffect, useState } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

export const audioTrackList = [
  {
    // string - path to audio file, required
    src: "",

    // string - 'none' | 'metadata' | 'auto', default: 'auto', optional
    preload: "auto",

    // duration - number, default: 0, optional
    // will updated automatically when track started or metadata loaded
    duration: 0,

    // JSX.Element - custom content instead of title, optional, deafult: <title> or <src>
    content: "Add a song to the queue",

    // MediaMetadata - media meta data, see `mediaMetadata` above
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata
    // optional
  },
];

export function NewAudioPlayer() {
  const [list, setList] = useState(audioTrackList);
  return (
    <div className="audio-player-container">
      <div className="audio-player-outer">
        <ReactJkMusicPlayer theme="dark" showDownload={false} defaultPosition={{bottom: 0}} />
      </div>
    </div>
  );
}
