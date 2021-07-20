import React, { useState, useEffect } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import {
  Alert,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const GoggleButton = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setLoggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
      }
    }
  };

  function onAuthStateChanged(user) {
    setUserInfo(user);
    console.log(user);
    if (user) setLoggedIn(true);
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '364375446707-3ro5r3sil60bg843jvv5o1mfhhgg43fl.apps.googleusercontent.com',
      offlineAccess: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => Alert.alert('Your are signed out.'));
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <GoogleSigninButton
        style={{ width: '100%', height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
      />
      {!userInfo && <Text>You are currently logged out</Text>}
      {userInfo && (
        <View>
          <Text>Welcom {userInfo.displayName}</Text>
          <Button onPress={signOut} title="LogOut" color="red" />
        </View>
      )}
    </>
  );
};

export default GoggleButton;
