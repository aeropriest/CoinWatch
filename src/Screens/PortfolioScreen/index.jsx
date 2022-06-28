import { View, Text } from "react-native";
import React, { Suspense } from "react";
import PortfolioAssetsList from "./Components/PortfolioAssetsList";
import { useTheme } from "@react-navigation/native";

const PortfolioScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
          <Text style={{ color: colors.background }}>Loading please wait</Text>
        }
      >
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
