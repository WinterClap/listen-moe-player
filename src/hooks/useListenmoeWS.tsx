import React from "react";
import { useDispatch } from "react-redux";
import { setWSData } from "../store/playerMoeSlice";
import { ListenMoeWSDataType, LISTEN_MOE_WEB_SOCKET_URLS } from "./constants";

const useListenmoeWS = (
  url: string = LISTEN_MOE_WEB_SOCKET_URLS.jpop
): [data: ListenMoeWSDataType | undefined, loading: boolean] => {
  const [data, setData] = React.useState<ListenMoeWSDataType>();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const ws = React.useRef<WebSocket | null>(null);
  const heartbeatInterval = React.useRef<number | null>(null);

  const heartbeat = (interval: number) => {
    return setInterval(() => {
      ws.current?.send(JSON.stringify({ op: 9 }));
    }, interval);
  };

  const initWS = React.useCallback(() => {
    console.log("outside if");
    if (ws.current === null) {
      console.log("inside if");
      setLoading(true);
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log("WS Opened");
        clearInterval(heartbeatInterval.current!);
        setLoading(false);
      };

      ws.current.onmessage = (message: any) => {
        let response;
        if (!message.data.length) return;
        try {
          response = JSON.parse(message.data);
        } catch (error) {
          console.error(error);
        }

        switch (response.op) {
          case 0:
            ws.current!.send(JSON.stringify({ op: 9 }));
            heartbeat(response.d.heartbeat);
            break;

          case 1:
            console.log("Response case 1: ", response.d);
            setData(response.d);
            dispatch(setWSData(response.d));
            break;
          default:
            break;
        }
      };

      ws.current.onclose = (event) => {
        console.log("WS closed");
        console.log(event);
        if (!event.reason) {
          ws.current = null;
          clearInterval(heartbeatInterval.current!);
          heartbeatInterval.current = null;
          setTimeout(() => initWS(), 5000);
          return;
        }
        ws.current = null;
        clearInterval(heartbeatInterval.current!);
        heartbeatInterval.current = null;
      };
    } else {
      console.log("before return");
      ws.current.close(1000, "change");
    }
  }, [url, dispatch]);

  React.useEffect(() => {
    console.log("Initializing...");
    initWS();
    const wsCurrent = ws.current;
    return () => {
      wsCurrent?.close();
      ws.current = null;
    };
  }, [initWS]);

  React.useEffect(() => {});

  return [data, loading];
};

export default useListenmoeWS;
