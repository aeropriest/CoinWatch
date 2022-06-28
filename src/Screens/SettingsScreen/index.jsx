import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SwitchToggle from "react-native-switch-toggle";
import lightMode, { darkMode } from "./styles";
import { useTheme } from "@react-navigation/native";
const SettingsScreen = () => {
  const [isDark, setIsDark] = useState(false);
  const changeTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };
  const { colors } = useTheme();
  return (
    <View style={isDark ? darkMode.screen : lightMode.screen}>
      <Text style={{ color: colors.text }}> Settings </Text>
      <View style={isDark ? darkMode.container : lightMode.container}>
        <Text
          style={{
            ...(isDark ? darkMode.text : lightMode.text),
            paddingLeft: 8,
          }}
        >
          Theme
        </Text>
        <View
          style={isDark ? darkMode.switchContainer : lightMode.switchContainer}
        >
          <Text
            style={{
              ...(isDark ? darkMode.text : lightMode.text),
              paddingRight: 10,
            }}
          >
            Dark
          </Text>
          <View style={{ paddingBottom: 1 }}>
            <SwitchToggle
              switchOn={isDark}
              onPress={() => changeTheme()}
              backgroundColorOn="grey"
              backgroundColorOff="grey"
              circleColorOff="black"
              circleColorOn="white"
              borderColor="red"
              containerStyle={
                isDark ? darkMode.toggleContainer : lightMode.toggleContainer
              }
              circleStyle={
                isDark ? darkMode.toggleCircle : lightMode.toggleCircle
              }
            />
          </View>
          <Text
            style={{
              ...(isDark ? darkMode.text : lightMode.text),
              paddingLeft: 10,
            }}
          >
            Light
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
