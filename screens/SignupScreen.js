import AuthContent from "../components/Auth/AuthContent";

function SignupScreen() {
  const signUpHandler = () => {};
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
