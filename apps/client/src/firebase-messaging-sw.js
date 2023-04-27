// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDkzRtx-C3FqCaD-NRx-Pla_7BWkZdSfeU",
  authDomain: "ltpx-13865.firebaseapp.com",
  projectId: "ltpx-13865",
  storageBucket: "ltpx-13865.appspot.com",
  messagingSenderId: "849542168487",
  appId: "1:849542168487:web:975f3ab06527568cf98082"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background messages ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
