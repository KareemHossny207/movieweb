import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

const formatFirebaseError = (error) => {
  console.log('Raw Firebase error:', error);
  
  if (error.code === 'auth/configuration-not-found') {
    return 'Firebase configuration error. Please check your setup.';
  }
  
  const errorMessage = error.message.replace('Firebase: ', '').replace(/\(auth.*\)/, '');
  
  // Map common Firebase errors to user-friendly messages
  const errorMap = {
    'Error (auth/email-already-in-use)': 'This email is already registered',
    'Error (auth/invalid-email)': 'Invalid email address',
    'Error (auth/operation-not-allowed)': 'Email/password accounts are not enabled. Please contact support.',
    'Error (auth/weak-password)': 'Password should be at least 6 characters',
    'Error (auth/user-disabled)': 'This account has been disabled',
    'Error (auth/user-not-found)': 'No account found with this email',
    'Error (auth/wrong-password)': 'Incorrect password',
    'Error (auth/network-request-failed)': 'Network error. Please check your connection.'
  };

  return errorMap[error.message] || errorMessage;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    try {
      console.log('Setting up auth state listener');
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user ? `User logged in: ${user.email}` : 'No user');
        setUser(user);
        setLoading(false);
      }, (error) => {
        console.error('Auth state change error:', error);
        setAuthError(formatFirebaseError(error));
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setAuthError(formatFirebaseError(error));
      setLoading(false);
    }
  }, []);

  const register = async (email, password, name) => {
    try {
      console.log('Starting registration process for:', email);
      setAuthError(null);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);

      // Update the user's profile with their name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      console.log('Profile updated with name:', name);

      setUser(userCredential.user);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      const formattedError = formatFirebaseError(error);
      setAuthError(formattedError);
      return { 
        success: false, 
        error: formattedError
      };
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.uid);
      setUser(userCredential.user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: formatFirebaseError(error)
      };
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      await signOut(auth);
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (authError) {
    console.error('Auth provider error:', authError);
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      isAuthenticated: !!user,
      authError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 