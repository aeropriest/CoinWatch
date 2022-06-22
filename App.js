import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import WatchListProvider from "./src/Context/WatchListContext";
import {RecoilRoot} from 'recoil'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { ActivityIndicator } from "react-native";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    DroidSans: require('./assets/fonts/DroidSans.ttf')
  });

  if( !fontsLoaded)
    return (<ActivityIndicator size='large'></ActivityIndicator>) 

  return (
    <NavigationContainer theme={{
       colors:{
        background:'#121212'
       }
    }}>
      <RecoilRoot>
      <WatchListProvider>
        <View style={styles.container}>
          <Navigation/>
          <StatusBar style="light" />
        </View>
      </WatchListProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "white",
    fontSize: 12,
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
    padding: 15,
    justifyContent: "space-between",
  },
  rank: {
    fontWeight: "bold",
    color: "white",
  },
  rankContainer: {
    backgroundColor: "#585858",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 5,
  },
});
