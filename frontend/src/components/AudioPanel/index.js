import { useState, useContext } from "react";
import { SongContext } from "../../context/Song";
import "./AudioPanel.css"

function AudioPanel () {
const {tracks} = useContext(SongContext);
const [trackIndex, setTrackIndex] = useState(0);
const [trackProgress, setTrackProgress] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="audio-control-section">
            <audio controls></audio>
        </div>
    )
}

export default AudioPanel;