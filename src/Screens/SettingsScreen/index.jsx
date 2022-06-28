import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SwitchToggle from "react-native-switch-toggle";

import { useTheme } from "@react-navigation/native";
import styles from "../HomeScreen/styles";
const SettingsScreen = () => {
  const [isDark, setIsDark] = useState(false);
  const changeTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };
  const { colors } = useTheme();
  console.log(colors);
  return (
    <View
      style={{ ...styles.container, backgroundColor: colors.darkBackground }}
    >
      <Text style={{ ...styles.text }}> Settings </Text>
      <View style={{ ...styles.switchContainer }}>
        <Text style={{ ...styles.text, paddingLeft: 8, color: colors.text }}>
          Theme
        </Text>
        <View style={{ ...styles.switchContainer }}>
          <Text
            style={{
              ...styles.text,
              paddingRight: 10,
              color: colors.text,
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
              containerStyle={styles.toggleContainer}
              circleStyle={styles.toggleCircle}
            />
          </View>
          <Text
            style={{
              ...styles.text,
              paddingLeft: 10,
              color: colors.text,
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
