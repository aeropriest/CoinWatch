import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import WatchlistScreen from "../Screens/WatchlistScreen";
import { Foundation } from "@expo/vector-icons";
import PortfolioScreen from "../Screens/PortfolioScreen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../Screens/SettingsScreen";
import themeContext from "./../config/themeContext";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const theme = useContext(themeContext);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        style: { borderTopWidth: 2 },
        headerRight: "280",
        headerShown: false,
        tabBarActiveTintColor: theme.color,
        tabBarInactiveTintColor: theme.lighter,
        tabBarStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name="home"
              size={focused ? 20 : 20}
              color={focused ? theme.selected : theme.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Foundation
              name="graph-pie"
              size={focused ? 25 : 25}
              color={focused ? theme.selected : theme.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="star"
              size={focused ? 20 : 20}
              color={focused ? theme.selected : theme.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="settings"
              size={focused ? 20 : 20}
              color={focused ? theme.selected : theme.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
