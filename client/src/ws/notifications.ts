import { RECONNECT_DELAY } from "../utils/constants";
import { ServerMessage, HeartbeatMessage, NotificationMessage } from "../utils/types";
import { incrementNotificationCount } from "../ui/notification";

let ws: WebSocket | null = null;
let reconnectTimeout: number | null = null;

const isHeartbeat = (message: ServerMessage): message is HeartbeatMessage => {
  return "type" in message && (message.type === "connected" || message.type === "ping");
};

const isNotification = (message: ServerMessage): message is NotificationMessage => {
  return "UserName" in message && "DocumentTitle" in message;
};

const disconnectNotifications = () => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  if (ws) {
    ws.close();
    ws = null;
  }
};

const handleNotification = (notification: any) => {
  console.log("New document notification:", notification);
  incrementNotificationCount();
};

const connectNotifications = () => {
  if (ws?.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("ws://localhost:8080/notifications");

  ws.onopen = () => {
    console.log("WebSocket open");
  };

  ws.onmessage = (event) => {
    try {
      const message: ServerMessage = JSON.parse(event.data);

      if (isHeartbeat(message)) return;

      if (isNotification(message)) {
        const notification = message as NotificationMessage;

        handleNotification(notification);
      }
    } catch (error) {
      console.log("Failed to parse notification:", error);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected");

    reconnectTimeout = window.setTimeout(() => {
      console.log("Reconnecting...");
      connectNotifications();
    }, RECONNECT_DELAY);
  };
};

export { connectNotifications, disconnectNotifications };
