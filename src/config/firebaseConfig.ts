import { initializeApp } from 'firebase/app';
import env from '@env';

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.DATABASE_URL,
  storageBucket: env.PROJECT_ID,
  messagingSenderId: env.STORAGE_BUCKET,
  appId: env.MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);

export default app;