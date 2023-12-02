import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkPlayList: null,
  playlists: null,
  tracks: null,
  cleanedPlaylistID: null,
  songsToReslove: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCheckedPlaylist: (state, action) => {
      state.checkedPlaylist = action.payload;
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setCleanedPlaylistID: (state, action) => {
      state.cleanedPlaylistID = action.payload;
    },
    setSongsToResolve: (state, action) => {
      state.songsToResolve = action.payload;
    },
  },
});
