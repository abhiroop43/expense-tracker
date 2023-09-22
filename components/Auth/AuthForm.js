import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../UI/Button";
import Input from "../Shared/Input";
import { GlobalStyles } from "../../constants/styles";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          textInputConfig={{
            onChangeText: updateInputValueHandler.bind(this, "email"),
            value: enteredEmail,
            keyboardType: "email-address",
          }}
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            textInputConfig={{
              onChangeText: updateInputValueHandler.bind(this, "confirmEmail"),
              value: enteredConfirmEmail,
              keyboardType: "email-address",
            }}
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          textInputConfig={{
            onChangeText: updateInputValueHandler.bind(this, "password"),
            secureTextEntry: true,
            value: enteredPassword,
          }}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            textInputConfig={{
              onChangeText: updateInputValueHandler.bind(
                this,
                "confirmPassword",
              ),
              secureTextEntry: true,
              value: enteredConfirmPassword,
            }}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
