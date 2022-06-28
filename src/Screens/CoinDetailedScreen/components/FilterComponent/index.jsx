import { Text, Pressable } from "react-native";
import React, { memo } from "react";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";

const FilterComponent = ({
  filterDay,
  filterText,
  selectedRange,
  setSelectedRange,
}) => {
  const { colors } = useTheme();

  const isFilterSelected = (filter) => filter === selectedRange;

  return (
    <Pressable
      onPress={() => setSelectedRange(filterDay)}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? colors.lightText
          : "transparent",
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: isFilterSelected(filterDay) ? "white" : "grey",
        }}
      >
        {filterText}
      </Text>
    </Pressable>
  );
};

export default memo(FilterComponent);
