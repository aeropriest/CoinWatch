import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, TextInput } from "react-native";
import CoinDetails from "../../../assets/data/crypto.json";
import CoinDetailsHeader from "./components/CoinDetailsHeader";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";

import { useRoute } from "@react-navigation/native";
import { getCoinData, getCoinMarketData } from "../../services/CryptoServices";
import { ActivityIndicator } from "react-native";
import FilterComponent from "./components/FilterComponent";

const filterDays = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];
const CoinDetailedScreen = () => {
  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  const [loadingCoin, setLoadingCoin] = useState(true);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");

  const fetchRangeCoinData = async (id, range) => {
    console.log(fetchRangeCoinData);
    const fetchCoinMarketData = await getCoinMarketData(id, range);
    setCoinMarketData(fetchCoinMarketData);
    setUsdValue(fetchCoinData?.market_data.current_price.usd);
  };

  const fetchCoinData = async () => {
    setLoadingCoin(true);
    const fetchCoinData = await getCoinData(coinId);
    const fetchCoinMarketData = await getCoinMarketData(coinId);
    setCoinData(fetchCoinData);
    setCoinMarketData(fetchCoinMarketData);
    setLoadingCoin(false);
    setUsdValue(fetchCoinData?.market_data.current_price.usd);
  };
  const [coinData, setCoinData] = useState("this is test coind data");
  const [coinMarketData, setCoinMarketData] = useState(
    "this is test coin market"
  );

  useEffect(() => {
    fetchCoinData();
    //fetchRangeCoinData(1);
  }, []);

  if (loadingCoin || !coinData || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    image: { small },
    id,
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coinData;

  const onSelectedRangeChange = (selectedRangeValue) => {
    console.log("onSelectedRangeChange------", selectedRangeValue);
    setSelectedRange(selectedRangeValue);
    fetchRangeCoinData(coinId, selectedRangeValue);
  };

  const priceChangeColor =
    price_change_percentage_24h > 0 ? "#34C759" : "#FF3B30" || "white";
  const charColor =
    current_price.usd < coinMarketData.prices[0][1] ? "#ea3943" : "#16c784";
  const screenWidth = Dimensions.get("window").width;

  const changeCoinValue = (value) => {
    setCoinValue(value);
    setUsdValue(value * current_price.usd);
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    setCoinValue(value / current_price.usd);
  };

  const formatCurrency = (value) => {
    "worklet";
    var showPrice = value;
    if (value === "") {
      showPrice =
        current_price.usd < 0
          ? current_price.usd
          : current_price.usd.toFixed(2);
    }
    return `$${showPrice.toLocaleString("en-US", { currency: "USD" })}`;
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ChartPathProvider
        data={{
          points: coinMarketData.prices.map(([x, y]) => ({ x, y })),
        }}
      >
        <CoinDetailsHeader
          coinId={id}
          image={small}
          name={name}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
            {/* <Text style={styles.currentPrice}>${current_price.usd.toLocaleString('en-US', {currency: 'USD'})}</Text> */}
          </View>
          <View
            style={{
              backgroundColor: priceChangeColor,
              borderRadius: 5,
              flexDirection: "row",
              paddingHorizontal: 6,
              paddingVertical: 5,
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={10}
              color="white"
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.change}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.filtersContainer}>
          {filterDays.map((day) => (
            <FilterComponent
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRange={onSelectedRangeChange}
              key={day.filterDay}
            />
          ))}
        </View>
        <View>
          <ChartPath
            strokeWidth={2}
            height={screenWidth / 2}
            stroke={charColor}
            width={screenWidth}
          />
          <ChartDot style={{ backgroundColor: charColor }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue.toString()}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue.toString()}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </ChartPathProvider>
    </View>
  );
};

export default CoinDetailedScreen;
