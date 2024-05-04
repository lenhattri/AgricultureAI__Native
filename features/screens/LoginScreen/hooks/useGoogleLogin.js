import { useDispatch } from 'react-redux';
import { userLoggedIn } from './actions'; // import the action

export default function useGoogleLogin() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // get the dispatch function

  const loginWithGoogle = async function() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "YOUR_ANDROID_CLIENT_ID",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            dispatch(userLoggedIn(res.user)); // dispatch the action
            navigation.navigate();
          })
          .catch(error => {
            console.log("firebase cred err:", error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  return loginWithGoogle;
}
