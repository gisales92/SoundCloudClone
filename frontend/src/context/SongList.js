import React, { createContext, useState, useEffect } from "react";


export const SongListContext = createContext();

export default ({ children }) => {
  const [songList, setSongList] = useState([]);

  const value = [songList, setSongList]


  return (
    <>
      <SongListContext.Provider value={value}>{children}</SongListContext.Provider>
    </>
  );
}
