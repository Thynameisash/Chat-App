import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

export default function Logout() {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // console.log(auth.currentUser);
      auth.signOut().then(() => {
        alert("Signed Out");
        navigation.replace("signIn");
      });
      // console.log(auth.currentUser);
    });
    return unsubscribe;
  }, [navigation]);
  return <View />;
}
