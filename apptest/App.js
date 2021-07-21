import App from './src/App';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return <App />;
};

export default Splash;
