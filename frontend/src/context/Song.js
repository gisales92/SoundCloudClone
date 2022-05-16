import { createContext, useState } from "react";

export const SongContext = createContext();

export default function SongProvider(props) {
    const [tracks, setTracks] = useState([]);
    return (
        <SongContext.Provider value={{tracks, setTracks}} >
            {props.children}
        </SongContext.Provider>
    );
}