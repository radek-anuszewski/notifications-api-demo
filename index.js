let timeout = null;
let leaveNotification = null;

const showNotification = () => {
  if (document.visibilityState === "visible") {
    clearTimeout(timeout);
    timeout = null;
    leaveNotification?.close();
    leaveNotification = null;
  }
  else {
    timeout = setTimeout(() => {
      leaveNotification = new Notification('You have items in cart', { body: 'Please come back and buy our products!' });
    }, 3000);
  }
};

const attachPageLeaveListener = () => {
  document.addEventListener('visibilitychange', showNotification);
}

document.querySelector('#block').addEventListener('click', () => {
  document.removeEventListener('visibilitychange', showNotification);
});

if (Notification.permission === "granted") {
  attachPageLeaveListener();
}
else {
  document.querySelector('#allow').addEventListener('click', async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      attachPageLeaveListener();
    }
  });
}

const notificationCounters = {};
document.querySelector('#show-tagged').addEventListener('click', () => {
  const tag = document.querySelector('#tag').value;
  notificationCounters[tag] = notificationCounters[tag]? notificationCounters[tag] + 1 : 1;
  new Notification(`Notification ${notificationCounters[tag]}`, { body: tag, tag })
});
