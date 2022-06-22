import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWatchListData } from "../services/CryptoServices";

export const allPortfolioAssetsBought = selector({
  key: "allPortfolioAssetsBought",
  get: async () => {
    console.log("--------allPortfolioAssetsBought selector------");
    const jsonValue = await AsyncStorage.getItem("@portfolio_coins");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  },
});

export const allPortfolioAssetsBoughtAPI = selector({
  key: "allPortfolioAssetsBoughtAPI",
  get: async ({ get }) => {
    const savedPortfolioAssets = get(allPortfolioAssetsSaved);
    const portfolioAssetsMarketData = await getWatchListData(
      1,
      savedPortfolioAssets.map((portfolioAsset) => portfolioAsset.id).join(",")
    );

    const boughtAssets = portfolioAssetsMarketData.map((boughtAsset) => {
      const portfolioAsset = portfolioAssetsMarketData.filter(
        (item) => boughtAsset.id === item.id
      )[0];
      return {
        ...boughtAsset,
        currentPrice: portfolioAsset.current_price,
        priceChangePercentage: portfolioAsset.price_change_percentage_24,
      };
    });

    return boughtAssets.sort(
      (item1, item2) =>
        item1.quantityBought * item1.currentPrice <
        item2.quantityBought * item2.currentPrice
    );
  },
});
export const allPortfolioAssets = atom({
  key: "allPortfolioAssets",
  default: allPortfolioAssetsBoughtAPI,
});

export const allPortfolioAssetsSaved = atom({
  key: "allPortfolioAssetsSaved",
  default: allPortfolioAssetsBought,
});
