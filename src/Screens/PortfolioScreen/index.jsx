import { View, Text } from "react-native";
import React, { Suspense } from "react";
import PortfolioAssetsList from "./Components/PortfolioAssetsList";

const PortfolioScreen = () => {
  console.log("portfolio screen loaded");
  return (
    <View>
      <Suspense
        fallback={<Text style={{ color: "white" }}>Loading please wait</Text>}
      >
        <PortfolioAssetsList></PortfolioAssetsList>
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
