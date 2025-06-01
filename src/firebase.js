import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAP-eDKAVtDrkKbKlDiw5UWAGQ2mtO9Lvg",
  authDomain: "movies-623dc.firebaseapp.com",
  projectId: "movies-623dc",
  storageBucket: "movies-623dc.appspot.com",
  messagingSenderId: "782217613802",
  appId: "1:782217613802:web:aa315a5d9ed8bba5196293"
};

let auth;
let app;

// Validate config
const validateConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required Firebase config fields: ${missingFields.join(', ')}`);
  }
};

// Initialize Firebase
try {
  console.log('Validating Firebase config...');
  validateConfig();
  
  console.log('Initializing Firebase with config:', {
    ...firebaseConfig,
    apiKey: '***[HIDDEN]***'
  });
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Set persistence to LOCAL
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('Firebase persistence set to LOCAL');
    })
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });

  console.log('Firebase Auth initialized with config:', {
    currentUser: auth.currentUser,
    authDomain: auth.config.authDomain,
    apiKey: '***[HIDDEN]***'
  });
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { auth };
export default app; 