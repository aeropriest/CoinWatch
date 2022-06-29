import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import themeContext from "../../config/themeContext";
import { StyleSheet } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import styles from "./styles";
import { EventRegister } from "react-native-event-listeners";

const SettingsScreen = () => {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);
  const changeThemeColors = () => {
    setMode(!mode);
    EventRegister.emit("changeTheme", mode);
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
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
          <SwitchToggle
            switchOn={mode}
            onPress={() => changeThemeColors()}
            backgroundColorOn="grey"
            backgroundColorOff="grey"
            circleColorOff={theme.background}
            circleColorOn="white"
            borderColor="red"
            containerStyle={styles.toggleContainer}
            circleStyle={styles.toggleCircle}
          />

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
