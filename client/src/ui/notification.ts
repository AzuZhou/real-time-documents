import { RESET_DELAY } from "../utils/constants";

let notificationCount = 0;
let resetTimer: number | null = null;

const showNotification = () => {
  const toast = document.getElementById("notification-toast");

  if (!toast) {
    console.log("Notification badge element not found");
    return;
  }

  toast.classList.remove("hidden");
};

const hideNotification = () => {
  const toast = document.getElementById("notification-toast");

  if (!toast) return;

  toast.classList.add("hidden");
};

const incrementNotificationCount = () => {
  notificationCount++;
  updateBadge();

  if (resetTimer) {
    clearTimeout(resetTimer);
  }

  resetTimer = window.setTimeout(() => {
    resetNotificationCount();
  }, RESET_DELAY);
};

const resetNotificationCount = () => {
  notificationCount = 0;
  updateBadge();

  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
};

const updateBadge = () => {
  const countBadge = document.getElementById("notification-count");

  if (!countBadge) return;

  if (notificationCount > 0) {
    countBadge.textContent = notificationCount > 99 ? "99" : notificationCount.toString();
    showNotification();
  } else {
    hideNotification();
  }
};

const __resetForTesting = () => {
  notificationCount = 0;
  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
  updateBadge();
};

const getNotificationCount = () => notificationCount;

export { incrementNotificationCount, getNotificationCount, __resetForTesting };
