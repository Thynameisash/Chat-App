import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TextInput, Button } from "react-native";
import Context from "../context/Context";
import { auth } from "../firebase";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser.emailVerified && authUser.displayName) {
        navigation.replace("home");
      } else if (authUser.emailVerified && !authUser.displayName) {
        navigation.replace("profile");
      } else {
        alert("Pls verify email");
      }
    });
    return unsubscribe;
  }, [navigation]);

  async function handleSignIn() {
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Welcome to ChatApp
      </Text>
      <Image
        source={require("../assets/welcome-img.jpg")}
        style={{ width: 180, height: 180 }}
      />
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            marginTop: 20,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title="Sign In"
            disabled={!email || !password}
            color={colors.secondary}
            onPress={handleSignIn}
          />
        </View>

        <Button
          raised
          style={{ marginTop: 150 }}
          onPress={() => navigation.navigate("signUp")}
          type="outline"
          title="New User? Sign Up"
        />
      </View>
    </View>
  );
};

export default SignIn;
