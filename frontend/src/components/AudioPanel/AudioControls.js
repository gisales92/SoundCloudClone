import React, {ReactComponent} from 'react';
import { ReactComponent as Play } from './Play.svg';
import { ReactComponent as Pause } from './Pause.svg';
import { ReactComponent as Next } from './Next.svg';
import { ReactComponent as Prev } from './Previous.svg';

export default function AudioControls({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) {
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="prev audio-control-button"
        aria-label="Previous"
        onClick={onPrevClick}
      >
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="pause audio-control-button"
          onClick={() => onPlayPauseClick(false)}
          aria-label="Pause"
        >
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="play audio-control-button"
          onClick={() => onPlayPauseClick(true)}
          aria-label="Play"
        >
          <Play />
        </button>
      )}
      <button
        type="button"
        className="next audio-control-button"
        aria-label="Next"
        onClick={onNextClick}
      >
        <Next />
      </button>
    </div>
  );
}
