import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  incrementNotificationCount,
  getNotificationCount,
  __resetForTesting,
} from "../notification";

describe("Notification Badge", () => {
  beforeEach(() => {
    document.body.innerHTML = `
       <div id="notification-toast" class="toast hidden">
         <div class="badge-wrapper">
            <i class="notification-icon fas fa-bell"></i>
            <span id="notification-count">0</span>
         </div>
         <p class="notification-text">New document added</p>
       </div>
    `;
    vi.useFakeTimers();
    __resetForTesting();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("should increment count and show toast", () => {
    incrementNotificationCount();

    expect(getNotificationCount()).toBe(1);

    const toast = document.getElementById("notification-toast");
    expect(toast?.classList.contains("hidden")).toBe(false);
  });

  it("should update count text", () => {
    incrementNotificationCount();
    incrementNotificationCount();

    const countBadge = document.getElementById("notification-count");
    expect(countBadge?.textContent).toBe("2");
  });

  it("should auto-hide after 10 seconds", () => {
    incrementNotificationCount();

    vi.advanceTimersByTime(10000);

    expect(getNotificationCount()).toBe(0);
  });

  it("should reset timer on new notification", () => {
    incrementNotificationCount();
    vi.advanceTimersByTime(8000);

    incrementNotificationCount();
    vi.advanceTimersByTime(8000);

    expect(getNotificationCount()).toBe(2);
  });
});
