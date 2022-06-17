import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/Screens/HomeScreen";
import CoindDetailsScreen from "./src/Screens/CoinDetailsScreen";
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer theme={{
       colors:{
        background:'#121212'
       }
    }}>
    <View style={styles.container}>
      <Navigation/>
      <StatusBar style="light" />
    </View>
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
