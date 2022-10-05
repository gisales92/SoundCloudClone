import React from "react";
import {
  AudioPlayerControlSprite,
  AudioPlayer,
  AudioPlayerPropsType,
} from "react-audio-player-pro";
import reactAudioPlayerProStyle from "react-audio-player-pro/dist/style.css";

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
  return (
    <div className="audio-player-container">
      <div className="audio-player-outer">
        <AudioPlayerControlSprite />

        <AudioPlayer
          trackList={audioTrackList}
          // default player state, optional
          defaultState={{
            // boolean - is player muted, optional, default: false
            isMuted: false,

            // number - active song index, optional, default: 0
            activeIndex: 0,

            // boolean - is shuffle on, optional, default: false
            isShuffleOn: false,

            // boolean - is track list open, optional, default: true
            isTrackListOpen: false,

            // string: 'none' | 'all' | 'one' - repeating state, optional, default: 'none'
            repeatingState: "none",
          }}
        />
      </div>
    </div>
  );
}
