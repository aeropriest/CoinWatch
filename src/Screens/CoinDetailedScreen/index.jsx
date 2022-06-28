import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, TextInput } from "react-native";
import CoinDetailsHeader from "./components/CoinDetailsHeader";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  getCoinData,
  getCoinMarketData,
  getCoinCandleData,
} from "../../services/CryptoServices";
import { ActivityIndicator } from "react-native";
import FilterComponent from "./components/FilterComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { useTheme } from "@react-navigation/native";

const filterDays = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const CoinDetailedScreen = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  const [loadingCoinInfo, setLoadingCoinInfo] = useState(true);
  const [coinCurrentPrice, setCoinCurrentPrice] = useState("1");
  const [fiatValue, setFiatValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");
  const [coinCandleData, setCoinCandleData] = useState(null);
  const [coinDataInfo, setCoinDataInfo] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [candleChartVisible, setCandleChartVisible] = useState(true);

  const fetchCoinCandleData = async (id, range) => {
    console.log("fetchCoinCandleData");
    const coinCadelDataFeed = await getCoinCandleData(id, range);
    console.log("fetchCoinCandleData", coinCadelDataFeed);
    setCoinCandleData(coinCadelDataFeed);
  };

  const fetchCoinMarketData = async (id, range) => {
    const coinMarketDataFeed = await getCoinMarketData(id, range);
    setCoinMarketData(coinMarketDataFeed);
    setCoinCurrentPrice(coinMarketDataFeed?.market_data.current_price.usd);
  };

  const fetchCoinDataInfo = async () => {
    //console.log("fetchCoinDataInfo");
    setLoadingCoinInfo(true);
    const coinDataInfoFeed = await getCoinData(coinId);
    //console.log(coinDataInfoFeed);
    const coinMarketDataFeed = await getCoinMarketData(coinId);
    setCoinDataInfo(coinDataInfoFeed);
    setCoinMarketData(coinMarketDataFeed);
    setLoadingCoinInfo(false);
    setFiatValue(coinDataInfoFeed?.market_data.current_price.usd);
  };

  useEffect(() => {
    fetchCoinDataInfo(coinId);
    fetchCoinMarketData(coinId, 1);
    fetchCoinCandleData(coinId, 1);
  }, []);

  const memoOnSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  const onSelectedRangeChange = (selectedRangeValue) => {
    //console.log("onSelectedRangeChange------", selectedRangeValue);
    setSelectedRange(selectedRangeValue);
    fetchCoinMarketData(coinId, selectedRangeValue);
    fetchCoinCandleData(coinId, selectedRangeValue);
  };

  if (loadingCoinInfo || !coinDataInfo || !coinMarketData || !coinCandleData) {
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
  } = coinDataInfo;

  const priceChangeColor =
    price_change_percentage_24h > 0 ? colors.green : colors.red || "white";
  const chartColor =
    current_price.usd < coinMarketData.prices[0][1] ? colors.red : colors.green;
  const screenWidth = Dimensions.get("window").width;

  const changeCoinCurrentPrice = (value) => {
    console.log("changeCoinCurrentPrice", value);
    setCoinCurrentPrice(value);
    setFiatValue(value * current_price.usd);
  };

  const changeFiatValue = (value) => {
    setFiatValue(value);
    setCoinCurrentPrice(value / current_price.usd);
  };

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd.toLocaleString("en-US", {
          currency: "USD",
        })}`;
      }
      return `$${current_price.usd
        .toFixed(2)
        .toLocaleString("en-US", { currency: "USD" })}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value).toLocaleString("en-US", {
        currency: "USD",
      })}`;
    }
    return `$${parseFloat(value)
      .toFixed(2)
      .toLocaleString("en-US", { currency: "USD" })}`;
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <CoinDetailsHeader
        coinId={id}
        image={small}
        name={name}
        symbol={symbol}
        marketCapRank={market_cap_rank}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={{ ...styles.name, color: colors.text }}>{name}</Text>
          <LineChart.PriceText
            format={formatCurrency}
            style={{ ...styles.currentPrice, color: colors.text }}
          />
          {/* <ChartYLabel format={formatCurrency} style={styles.currentPrice} /> */}
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
      <View
        style={{
          ...styles.filtersContainer,
          backgroundColor: colors.darkBackground,
        }}
      >
        {filterDays.map((day) => (
          <FilterComponent
            filterDay={day.filterDay}
            filterText={day.filterText}
            selectedRange={selectedRange}
            setSelectedRange={memoOnSelectedRangeChange}
            key={day.filterDay}
          />
        ))}
        {candleChartVisible ? (
          <MaterialIcons
            name="waterfall-chart"
            size={24}
            color={colors.green}
            onPress={() => setCandleChartVisible(false)}
          />
        ) : (
          <MaterialIcons
            name="show-chart"
            size={24}
            color={colors.green}
            onPress={() => setCandleChartVisible(true)}
          />
        )}
      </View>

      {candleChartVisible ? (
        <CandlestickChart.Provider
          data={coinCandleData.map(([timestamp, open, high, low, close]) => ({
            timestamp,
            open,
            high,
            low,
            close,
          }))}
        >
          <CandlestickChart height={screenWidth / 2} width={screenWidth}>
            <CandlestickChart.Candles />
            <CandlestickChart.Crosshair>
              <CandlestickChart.Tooltip
                style={{
                  color: colors.backgroundColor,
                  backgroundColor: colors.darkBackground,
                  borderColor: colors.red,
                  width: 100,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  alignItems: "center",
                  top: "50%",
                  borderRadius: 5,
                  fontWeight: "bold",
                }}
              />
            </CandlestickChart.Crosshair>
          </CandlestickChart>
          <View style={styles.candleStickContainer}>
            <View>
              <Text
                style={{
                  ...styles.candleStickTextLabel,
                  color: colors.lightText,
                }}
              >
                Open
              </Text>
              <CandlestickChart.PriceText
                type="open"
                style={{ ...styles.candleStickText, color: colors.text }}
              />
            </View>
            <View>
              <Text
                style={{
                  ...styles.candleStickTextLabel,
                  color: colors.lightText,
                }}
              >
                High
              </Text>
              <CandlestickChart.PriceText
                type="high"
                style={{ ...styles.candleStickText, color: colors.lightText }}
              />
            </View>
            <View>
              <Text
                style={{
                  ...styles.candleStickTextLabel,
                  color: colors.lightText,
                }}
              >
                Low
              </Text>
              <CandlestickChart.PriceText
                type="low"
                style={{ ...styles.candleStickText, color: colors.lightText }}
              />
            </View>
            <View>
              <Text
                style={{
                  ...styles.candleStickTextLabel,
                  color: colors.lightText,
                }}
              >
                Close
              </Text>
              <CandlestickChart.PriceText
                type="close"
                style={{ ...styles.candleStickText, color: colors.lightText }}
              />
            </View>
          </View>
          <CandlestickChart.DatetimeText
            style={{ color: colors.lightText, fontWeight: "700", margin: 10 }}
          />
        </CandlestickChart.Provider>
      ) : (
        <LineChart.Provider
          data={coinMarketData.prices.map(([timestamp, value]) => ({
            timestamp,
            value,
          }))}
        >
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} width={1.5} />
            <LineChart.CursorCrosshair color={chartColor}>
              <LineChart.Tooltip
                style={{
                  color: colors.red,
                  backgroundColor: colors.backgroundColor,
                  width: 100,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  alignItems: "center",
                  top: "50%",
                  borderRadius: 5,
                  fontWeight: "bold",
                }}
              />
            </LineChart.CursorCrosshair>
            <LineChart.CursorLine />
          </LineChart>
        </LineChart.Provider>
      )}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: colors.text, alignSelf: "center" }}>
            {symbol.toUpperCase()}
          </Text>
          <TextInput
            style={{
              ...styles.input,
              color: colors.text,
              borderBottomColor: colors.text,
            }}
            value={coinCurrentPrice.toString()}
            keyboardType="numeric"
            onChangeText={changeCoinCurrentPrice}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: colors.lightText, alignSelf: "center" }}>
            USD
          </Text>
          <TextInput
            style={{
              ...styles.input,
              color: colors.text,
              borderBottomColor: colors.text,
            }}
            value={fiatValue?.toString()}
            keyboardType="numeric"
            onChangeText={changeFiatValue}
          />
        </View>
      </View>
    </View>
  );
};

export default CoinDetailedScreen;
