import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetailedScreen from "../Screens/CoinDetailedScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AddNewAssetScreen from "../Screens/AddNewAssetScreen";
import { useTheme } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const colors = useTheme();
  let background = "#ffffff";
  let tint = "#121212";
  if (colors.dark) {
    background = "#121212";
    tint = "#ffffff";
  }
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetailedScreen"
        component={CoinDetailedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewAssetScreen"
        component={AddNewAssetScreen}
        options={{
          title: "Add New Asset",
          headerStyle: {
            backgroundColor: background,
          },
          headerTintColor: tint,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};
export default Navigation;
