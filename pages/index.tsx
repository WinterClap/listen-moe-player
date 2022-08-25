import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Content } from "../src/Components/Content";
import { Player } from "../src/Components/Player";
import useListenmoeWS from "../src/hooks/useListenmoeWS";
import { COVERS_BASE_URL } from "./constants";
import { Main } from "./styles";
import AudioComponent from "../src/Components/Player/Audio";
import { useSelector } from "react-redux";
import { RootState } from "../src/store";
import { LISTEN_MOE_WEB_SOCKET_URLS } from "../src/hooks/constants";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { setWSData } from "../src/store/playerMoeSlice";

export const Home: NextPage = () => {
  const { musicType, data } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  let interval: ReturnType<typeof setInterval>;

  const { sendMessage, readyState } = useWebSocket(LISTEN_MOE_WEB_SOCKET_URLS[musicType], {
    onMessage: (event) => {
      const response = JSON.parse(event.data);
      if (response) {
        switch (response.op) {
          case 0:
            console.log(response.d);
            sendMessage(JSON.stringify({ op: 9 }));
            interval = setInterval(() => {
              console.log("hearbeat");
              sendMessage(JSON.stringify({ op: 9 }));
            }, response.d.heartbeat);
            break;

          case 1:
            console.log("Response case 1: ", response.d);
            dispatch(setWSData(response.d));
            break;
          default:
            break;
        }
      }
    },
    onClose: () => {
      clearInterval(interval);
    },
  });
  // const [data, loading] = useListenmoeWS(LISTEN_MOE_WEB_SOCKET_URLS[musicType]);
  console.log("DATA: ", data);

  const getAlbumsNames = React.useCallback(() => {
    return (
      (data &&
        data.song.albums.reduce((acc, cur, index: number) => acc + ((index !== 0 && ", ") || "") + cur.name, "")) ||
      ""
    );
  }, [data]);

  const getArtistsNames = React.useCallback(() => {
    return (
      (data &&
        data.song.artists.reduce((acc, cur, index: number) => acc + ((index !== 0 && ", ") || "") + cur.name, "")) ||
      ""
    );
  }, [data]);

  return (
    <>
      <Head>
        <title>Radio player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/musical-note-outline.svg" />
      </Head>
      <Main>
        <>
          <AudioComponent />
          <Content />
          {data && (
            <Player
              coverURL={
                (!!data.song.albums.length &&
                  data.song.albums[0].image &&
                  `${COVERS_BASE_URL}${data.song.albums[0].image}`) ||
                null
              }
              album={(!!data.song.albums.length && getAlbumsNames()) || null}
              artist={(!!data.song.artists.length && getArtistsNames()) || null}
              duration={data.song.duration}
              title={data.song.title}
              isRadio
            />
          )}
        </>
      </Main>
    </>
  );
};

export default Home;
