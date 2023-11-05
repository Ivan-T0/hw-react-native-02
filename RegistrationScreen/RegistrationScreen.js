import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useFonts } from "expo-font";
import Background from "../assets/background.png";
import Rectangle from "../assets/Image.jpg";
import add from "../assets/add1.png";
import { useState } from "react";
const RegistrationScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../Fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("../Fonts/Roboto-Light.ttf"),
  });
  const [loginText, setLoginText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const onLogin = () => {
    console.log(`login - ${loginText}
      email - ${emailText}
      password - ${passwordText}`);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <ImageBackground style={styles.bg} source={Background}>
          <KeyboardAvoidingView
            style={styles.Keyboard}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.container}>
              <TouchableOpacity>
                <Image style={styles.image} source={Rectangle} />
                <Image style={styles.add} source={add} />
              </TouchableOpacity>

              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={[styles.placeholderText, { color: "black" }]}
                placeholder="Логін"
                value={loginText}
                onChangeText={setLoginText}
              />
              <TextInput
                style={[styles.placeholderText, { color: "black" }]}
                placeholder="Адреса електронної пошти"
                value={emailText}
                onChangeText={setEmailText}
              />
              <View style={styles.passwordInput}>
                <TextInput
                  style={[styles.placeholderText, { color: "black" }]}
                  placeholder="Пароль"
                  value={passwordText}
                  onChangeText={setPasswordText}
                />

                <Text style={styles.text}>Показати</Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={onLogin}>
                <Text style={styles.buttonText}>Зареєстуватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.LoginText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 500,
    backgroundColor: "#FFFFFF",
    marginTop: 243,
    paddingLeft: 16,
    paddingRight: 16,
  },
  Keyboard: { justifyContent: "flex-end" },

  add: {
    position: "absolute",
    top: 20,
    right: 108,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
    marginTop: 92,
    width: "100%",
    marginBottom: 33,
  },
  placeholderText: {
    color: "#bdbdbd",
    fontFamily: "Roboto-Light",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 16,
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 40,
    borderRadius: 5,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordPlaceholderText: {
    color: "#bdbdbd",
    fontFamily: "Roboto-Light",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 16,
    width: "80%",
    height: 50,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
  },
  text: {
    color: "#1B4371",
    position: "absolute",
    top: 16,
    right: 20,
  },
  button: {
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 100,
    marginTop: 43,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  LoginText: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Light",
    fontSize: 16,
  },
  image: {
    position: "absolute",
    width: 120,
    height: 120,
    left: 120,
    top: -60,
    borderRadius: 16,
  },
});
export default RegistrationScreen;
