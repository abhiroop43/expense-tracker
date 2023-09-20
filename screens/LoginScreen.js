import AuthContent from "../components/Auth/AuthContent";

function LoginScreen() {
  const loginHandler = () => {};

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
