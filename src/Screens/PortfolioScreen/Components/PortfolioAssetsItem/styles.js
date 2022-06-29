import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "blue",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-end",
    paddingBottom: 5,
  },
  symbol: {
    color: "grey",
    fontWeight: "600",
    paddingBottom: 2,
  },
  qtyContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
});

export default styles;
