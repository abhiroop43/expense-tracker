import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    console.log(email, password);
    const authResponse = await auth().createUserWithEmailAndPassword(
      "test@test.com",
      "Abcd@1234",
    );
    console.log(authResponse);
    setIsAuthenticating(false);
  };

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
