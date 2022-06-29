import { View, Text } from "react-native";
import React, { Suspense, useContext } from "react";
import PortfolioAssetsList from "./Components/PortfolioAssetsList";
import { useTheme } from "@react-navigation/native";
import themeContext from "./../../config/themeContext";

const PortfolioScreen = () => {
  const theme = useContext(themeContext);
  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <Suspense
        fallback={
          <Text style={{ color: theme.background }}>Loading please wait</Text>
        }
      >
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
