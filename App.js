import { StyleSheet, View, Appearance } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/Navigation";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native"; // IMPORT THEMES HERE!!!
import WatchListProvider from "./src/Context/WatchListContext";
import { RecoilRoot } from "recoil";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

export default function App() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    console.warn(scheme.colorScheme);
    console.log(scheme.colorScheme);
  });

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    DroidSans: require("./assets/fonts/DroidSans.ttf"),
  });

  if (!fontsLoaded) return <ActivityIndicator size="large"></ActivityIndicator>;

  return (
    <NavigationContainer theme={darkTheme}>
      <RecoilRoot>
        <WatchListProvider>
          <View style={darkTheme.container}>
            <Navigation />
            <StatusBar style="light" />
          </View>
        </WatchListProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#121212",
//     paddingTop: 50,
//   },
//   title: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   text: {
//     color: "white",
//     fontSize: 12,
//     marginRight: 5,
//   },
//   coinContainer: {
//     flexDirection: "row",
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "grey",
//     padding: 15,
//     justifyContent: "space-between",
//   },
//   rank: {
//     fontWeight: "bold",
//     color: "white",
//   },
//   rankContainer: {
//     backgroundColor: "#585858",
//     borderRadius: 5,
//     paddingHorizontal: 5,
//     marginRight: 5,
//   },
// });

const lightTheme = {
  dark: false,
  colors: {
    background: "#ffffff",
    darkBackground: "#eeeeee",
    text: "#181818",
    lightText: "#121212",
    red: "#FF3B30",
    green: "#34C759",
    buttonTextColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 50,
  },
};

const darkTheme = {
  dark: true,
  colors: {
    darkBackground: "#181818",
    background: "#121212",
    text: "#ffffff",
    lightText: "#dddddd",
    red: "#FF3B30",
    green: "#34C759",
    buttonTextColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
};
