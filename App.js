import { StyleSheet, View, Appearance, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/Navigation";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"; // IMPORT THEMES HERE!!!
import WatchListProvider from "./src/Context/WatchListContext";
import { RecoilRoot } from "recoil";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./src/config/themeContext";
import { darkTheme, lightTheme, theme } from "./src/config/themes";
export default function App() {
  const [mode, setMode] = useState(true);
  useEffect(() => {
    let eventListner = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListner);
    };
  });

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    DroidSans: require("./assets/fonts/DroidSans.ttf"),
  });

  if (!fontsLoaded) return <ActivityIndicator size="large"></ActivityIndicator>;
  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
        <RecoilRoot>
          <WatchListProvider>
            <View
              style={
                mode === true ? theme.dark.container : theme.light.container
              }
            >
              <Navigation />
              <StatusBar style={mode === true ? "light" : "dark"} />
            </View>
          </WatchListProvider>
        </RecoilRoot>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
