import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NX_FIREBASE_API_KEY,
  authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NX_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NX_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NX_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
