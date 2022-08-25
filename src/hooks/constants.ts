export const LISTEN_MOE_WEB_SOCKET_URLS = {
  jpop: "wss://listen.moe/gateway_v2",
  kpop: "wss://listen.moe/kpop/gateway_v2",
};

export const LISTEN_MOE_STREAM_URL = {
  jpop: "https://listen.moe/stream",
  kpop: "https://listen.moe/kpop/stream",
};

export type ListenMoeWSDataType = {
  event: unknown | null;
  lastPlayed: Song[];
  listeners: number;
  requester: Requester;
  song: Song;
  startTime: string;
};

type Song = {
  albums: Album[];
  artists: Artist[];
  characters: [];
  duration: number;
  id: number;
  sources: [];
  title: string;
};

type Requester = {
  displayName: string;
  username: string;
  uuid: string;
};

type Album = {
  id: number;
  image: string | null;
  name: string;
  nameRomaji: string | null;
};
type Artist = {
  characters: [];
  id: number;
  image: string | null;
  name: string;
  nameRomaji: string | null;
};
