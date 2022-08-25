import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ListenMoeWSDataType } from "../hooks/constants";

interface PlayerMoeStateI {
  isPlaying: boolean;
  musicType: "kpop" | "jpop";
  isLoading: boolean;
  volume: number;
  shouldShowFullScreenPlayer: boolean;
  shouldShowVolumeRange: boolean;
  data: ListenMoeWSDataType | undefined;
  currentSource: string | undefined;
}

const initialState: PlayerMoeStateI = {
  musicType: "jpop",
  currentSource: undefined,
  isPlaying: false,
  isLoading: false,
  volume: 50,
  shouldShowFullScreenPlayer: false,
  shouldShowVolumeRange: false,
  data: undefined,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<PlayerMoeStateI["isPlaying"]>) => {
      state.isPlaying = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<PlayerMoeStateI["isLoading"]>) => {
      state.isLoading = action.payload;
    },
    setVolume: (state, action: PayloadAction<PlayerMoeStateI["volume"]>) => {
      state.volume = action.payload;
    },
    setShouldShowFullScreenPlayer: (state, action: PayloadAction<PlayerMoeStateI["shouldShowFullScreenPlayer"]>) => {
      state.shouldShowFullScreenPlayer = action.payload;
    },
    setShouldShowVolumeRange: (state, action: PayloadAction<PlayerMoeStateI["shouldShowVolumeRange"]>) => {
      state.shouldShowVolumeRange = action.payload;
    },
    setWSData: (state, action: PayloadAction<ListenMoeWSDataType>) => {
      state.data = action.payload;
    },
    setCurrentSource: (state, action: PayloadAction<PlayerMoeStateI["currentSource"]>) => {
      state.currentSource = action.payload;
    },
    setMusicType: (state, action: PayloadAction<PlayerMoeStateI["musicType"]>) => {
      state.musicType = action.payload;
    },
  },
});

export const {
  setIsPlaying,
  setIsLoading,
  setVolume,
  setShouldShowFullScreenPlayer,
  setShouldShowVolumeRange,
  setWSData,
  setCurrentSource,
  setMusicType,
} = playerSlice.actions;
