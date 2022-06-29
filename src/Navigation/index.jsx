import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetailedScreen from "../Screens/CoinDetailedScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AddNewAssetScreen from "../Screens/AddNewAssetScreen";
import themeContext from "../config/themeContext";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = useContext(themeContext);
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
            backgroundColor: theme.background,
          },
          headerTintColor: theme.color,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};
export default Navigation;
