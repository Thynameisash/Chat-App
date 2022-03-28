import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Text, View, LogBox, StyleSheet } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./Screens/SignIn";
import Profile from "./Screens/Profile";
import Context from "./context/Context";
import ContextWrapper from "./context/ContextWrapper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Photo from "./Screens/Photo";
import Chat from "./Screens/Chat";
import Contacts from "./Screens/Contacts";
import ChatScreen from "./Screens/ChatScreen";
import ChatHeader from "./Components/ChatHeader";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import SignUp from "./Screens/SignUp";
import Ionicons from "react-native-vector-icons/Ionicons";
import Logout from "./Screens/Logout";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Invalid props.style",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
// const navigation = useNavigation();

const App = ({ navigation }) => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

  // const signOutUser = () => {
  //   auth.signOut().then(() => {
  //     // console.log(auth.currentUser);
  //   });
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "ChatApp",
  //     headerStyle: { backgroundColor: "#CB7BE4" },
  //     headerTintStyle: { colors: "white" },
  //     headerTintColor: "white",

  //     headerLeft: () => (
  //       <View style={{ marginLeft: 20 }}>
  //         <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
  //           <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //   });
  // }, [navigation]);

  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerBackTitle: false,
              title: "Sign In",
            }}
            name="signIn"
            component={SignIn}
          />
          <Stack.Screen
            options={{ headerBackTitleVisible: false, headerBackTitle: false }}
            name="signUp"
            component={SignUp}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          <Stack.Screen
            options={{
              title: "Sign In",
              headerBackTitleVisible: false,
              headerBackTitle: false,
            }}
            name="signIn"
            component={SignIn}
          />

          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerBackTitle: false,
              title: "Sign Up",
            }}
            name="signUp"
            component={SignUp}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            style={{ padding: 6 }}
            name="home"
            options={{
              title: "ChatApp",
              headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                  <TouchableOpacity>
                    <Avatar
                      rounded
                      source={{ uri: auth?.currentUser?.photoURL }}
                    />
                  </TouchableOpacity>
                </View>
              ),
            }}
            component={Home}
          />
          <Stack.Screen
            name="contacts"
            options={{ title: "Contacts" }}
            component={Contacts}
          />
          <Stack.Screen
            name="chatscreen"
            options={{
              headerBackTitleVisible: false,
              headerTitle: (props) => <ChatHeader {...props} />,
            }}
            component={ChatScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

// ___________________________Home Component_____________________________

function Home() {
  const {
    theme: { colors },
  } = useContext(Context);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" size={24} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chat} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
}

const Main = () => {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png")
  );

  if (!assets) {
    return <Text> Loading...</Text>;
  }
  return (
    // <SafeAreaView style={[styles.container]}>
    <ContextWrapper>
      <App />
    </ContextWrapper>
    // </SafeAreaView>
  );
};

export default Main;
