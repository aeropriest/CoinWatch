import { View, Text, Switch } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import SwitchToggle from "react-native-switch-toggle";
import { StyleSheet } from "react-native";

import styles from "./styles";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./../../config/themeContext";

const SettingsScreen = () => {
  const [mode, setMode] = useState(false);
  const theme = useContext(themeContext);

  const changeThemeColors = () => {
    setMode(!mode);
    EventRegister.emit("changeTheme", mode);
  };

  return (
    <View style={{ background: "red", flex: 1 }}>
      <Text
        style={{
          fontFamily: "DroidSans",
          fontSize: 24,
          letterSpacing: 1,
          color: theme.color,
          alignSelf: "center",
          paddingBottom: 20,
        }}
      >
        Settings
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.background,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "grey",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "grey",
          paddingHorizontal: 15,
          paddingVertical: 15,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: theme.color, alignSelf: "center" }}>Theme</Text>
        <View
          style={{
            color: theme.color,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: theme.color,
              alignSelf: "center",
              paddingRight: 10,
            }}
          >
            Dark
          </Text>
          <View style={{ paddingBottom: 1 }}>
            <SwitchToggle
              switchOn={mode}
              onPress={() => changeThemeColors()}
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
              color: theme.color,
              alignSelf: "flex-end",
              alignSelf: "center",
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
