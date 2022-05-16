import { createContext, useState } from "react";

export const SongContext = createContext();

export default function SongProvider(props) {
    const [tracks, setTracks] = useState([{name: "Give It To Me (REDÜKT Remix)", artist: "REDÜKT", previewImage: "https://i1.sndcdn.com/artworks-Kml4cJSBMFPLoRce-AyXCXg-t500x500.jpg", url: "https://res.cloudinary.com/pressplay/video/upload/v1652690707/Give_Me_Extended_master_16_44_ohkvzz.wav"}]);
    return (
        <SongContext.Provider value={{tracks, setTracks}} >
            {props.children}
        </SongContext.Provider>
    );
}