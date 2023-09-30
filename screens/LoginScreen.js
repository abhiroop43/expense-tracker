import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { authenticate } from "../store/redux/authentication";
import { Alert } from "react-native";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    console.log(email, password);
    const authResponse = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    try {
      const token = await auth().currentUser.getIdToken();
      // console.log(JSON.stringify(authResponse));
      // console.log(token);
      dispatch(authenticate(token));
    } catch (err) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in. Please check your credentials or try again later.",
      );
    }

    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in...." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
