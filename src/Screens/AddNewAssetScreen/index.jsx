import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import SearchableDropDown from "react-native-searchable-dropdown";
import styles from "./styles";

const AddNewAssetScreen = () => {
  const [boughtAssetQty, setBoughtAssetQty] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <SearchableDropDown
        items={["one", "tow"]}
        onItemSelect={(item) => console.log(item)}
        containerStyle={styles.dropDownContainer}
        itemStyle={styles.item}
        itemTextStyle={{
          color: "white",
        }}
        resetValue={false}
        placeholder={"Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
      <View style={styles.boughtQtyContainer}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ color: "white", fontSize: 90 }}
            value={boughtAssetQty}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={setBoughtAssetQty}
          />
          <Text style={styles.ticker}>BTC</Text>
        </View>
        <Text style={styles.pricePerCoin}>$8000 per coin</Text>
      </View>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("AddNewAssetScreen")}
      >
        <Text style={styles.buttonText}>Add new assets</Text>
      </Pressable>
    </View>
  );
};

export default AddNewAssetScreen;
