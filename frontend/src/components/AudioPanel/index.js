import React, { useState, useEffect, useRef, useCallback } from "react";
import AudioControls from "./AudioControls";
import "./AudioPanel.css";

function AudioPanel({ tracks }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { name, artist, previewImage, url } = tracks.tracks[trackIndex];

  const audioRef = useRef(new Audio());
  audioRef.crossOrigin = "";
  audioRef.src = url
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = useCallback(() => {
    if (trackIndex < tracks.tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }, [trackIndex, tracks.tracks.length])

  const startTimer = useCallback(() => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }, [toNextTrack]
  )
  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "";
    audioRef.current.src = url;
    console.log(".current value: ",audioRef.current)
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex, startTimer, url]);

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #ffffff), color-stop(${currentPercentage}, #bdb9b7))
`;

  return (
    <div className="audio-control-panel">
      <div className="audio-control-content">
        <div className="audio-player">
          <div className="track-thumb">
            <img
              className="artwork"
              src={previewImage ? previewImage : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"}
              alt={`track artwork for ${name} by ${artist}`}
              crossOrigin=""
            />
            <div className="track-info">
              <p className="title">{name}</p>
              <p className="artist">{artist}</p>
            </div>
          </div>
        </div>
        <div className="audio-left">
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
          <p className="current-time">{`${Math.floor(trackProgress/60)}:${Math.trunc(trackProgress%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`}</p>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
          <p className="total-time">{duration ? `${Math.floor(duration/60)}:${Math.trunc(duration%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}` : "0:00"}</p>
        </div>
      </div>
    </div>
  );
}

export default AudioPanel;
