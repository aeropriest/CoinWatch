import { Text, Pressable } from "react-native";
import React, { memo, useContext } from "react";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import themeContext from "../../../../config/themeContext";

const FilterComponent = ({
  filterDay,
  filterText,
  selectedRange,
  setSelectedRange,
}) => {
  const theme = useContext(themeContext);

  const isFilterSelected = (filter) => filter === selectedRange;

  return (
    <Pressable
      onPress={() => setSelectedRange(filterDay)}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? theme.color
          : "transparent",
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: isFilterSelected(filterDay) ? theme.background : theme.color,
        }}
      >
        {filterText}
      </Text>
    </Pressable>
  );
};

export default memo(FilterComponent);
