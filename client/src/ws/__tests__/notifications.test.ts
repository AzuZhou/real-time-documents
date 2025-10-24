import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { connectNotifications, disconnectNotifications, getWebSocket } from "../notifications";

vi.mock("../../ui/notification", () => ({
  incrementNotificationCount: vi.fn(),
}));

class MockWebSocket {
  static OPEN = 1;
  readyState = MockWebSocket.OPEN;
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;

  constructor(public url: string) {
    setTimeout(() => {
      if (this.onopen) {
        this.onopen(new Event("open"));
      }
    }, 0);
  }

  close() {
    if (this.onclose) {
      this.onclose(new CloseEvent("close"));
    }
  }

  send(data: string) {}
}

global.WebSocket = MockWebSocket as any;

describe("WebSocket Notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    disconnectNotifications();
  });

  it("should connect to WebSocket", () => {
    connectNotifications();

    const ws = getWebSocket();
    expect(ws).toBeTruthy();
  });

  it("should ignore heartbeat messages", async () => {
    const { incrementNotificationCount } = await import("../../ui/notification");

    connectNotifications();
    const ws = getWebSocket() as MockWebSocket;

    if (ws.onmessage) {
      ws.onmessage(
        new MessageEvent("message", {
          data: JSON.stringify({ type: "ping" }),
        })
      );
    }

    expect(incrementNotificationCount).not.toHaveBeenCalled();
  });

  it("should handle document notifications", async () => {
    const { incrementNotificationCount } = await import("../../ui/notification");

    connectNotifications();
    const ws = getWebSocket() as MockWebSocket;

    if (ws.onmessage) {
      ws.onmessage(
        new MessageEvent("message", {
          data: JSON.stringify({
            UserName: "John",
            DocumentTitle: "Test Doc",
            Timestamp: "2024-01-01T00:00:00Z",
            UserID: "123",
            DocumentID: "456",
          }),
        })
      );
    }

    expect(incrementNotificationCount).toHaveBeenCalledTimes(1);
  });

  it("should disconnect cleanly", () => {
    connectNotifications();

    disconnectNotifications();

    expect(getWebSocket()).toBeNull();
  });
});
