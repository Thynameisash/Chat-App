import Context from "../context/Context";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TextInput, Button } from "react-native";
import { auth } from "../firebase";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    theme: { colors },
  } = useContext(Context);

  const handleSignUp = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.sendEmailVerification();
        auth.signOut();
        alert("Email sent");
        navigation.navigate("signIn");
      })
      .catch((error) => alert(error.message));
  };
  const handlePress = () => {
    navigation.navigate("signIn");
  };

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
        Register Here
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
        <View style={{ marginTop: 20, justifyContent: "space-evenly" }}>
          <Button
            title="Sign Up"
            disabled={!email || !password}
            color={colors.secondary}
            onPress={handleSignUp}
          />
        </View>

        <Button
          raised
          onPress={handlePress}
          type="outline"
          title="Go back to Login"
        />
      </View>
    </View>
  );
};

export default SignUp;
