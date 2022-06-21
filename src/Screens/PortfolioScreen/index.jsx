import { View, Text } from "react-native";
import React from "react";
import PortfolioAssetsList from "./Components/PortfolioAssetsList";

const PortfolioScreen = () => {
  console.log("portfolio screen loaded");
  return (
    <View>
      <PortfolioAssetsList></PortfolioAssetsList>
    </View>
  );
};

export default PortfolioScreen;
