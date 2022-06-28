import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useWatchList } from "../../../../Context/WatchListContext";

const CoinDetailsHeader = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { coinId, image, name, symbol, marketCapRank } = props;
  const { watchListCoinsId, saveWatchListCoinId, removeWatchListCoinId } =
    useWatchList();

  const IsCoinWatchListed = () =>
    watchListCoinsId.some((coinIdValue) => coinIdValue === coinId);

  const onStarPress = () => {
    if (IsCoinWatchListed()) {
      return removeWatchListCoinId(coinId);
    }
    return saveWatchListCoinId(coinId);
  };
  return (
    <View style={{ ...styles.header }}>
      <Ionicons
        name="chevron-back"
        size={30}
        color={colors.text}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.ticker}>
        <Image source={{ uri: image }} style={{ width: 20, aspectRatio: 1 }} />
        <Text style={{ ...styles.title, color: colors.text }}>
          {symbol.toUpperCase()}
        </Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      {/* {<FontAwesome5 name="user-circle" size={25} color="white" />} */}
      <AntDesign
        name={IsCoinWatchListed() ? "star" : "staro"}
        size={25}
        color={IsCoinWatchListed() ? "#FFBF00" : "white"}
        onPress={onStarPress}
      />
    </View>
  );
};

export default CoinDetailsHeader;
