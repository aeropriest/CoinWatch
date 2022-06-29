import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  switchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 5,
    justifyContent: "space-betweens",
  },
  text: { color: "#121212", alignSelf: "center" },
  toggleContainer: {
    marginTop: 1,
    width: 45,
    height: 27,
    borderRadius: 25,
    padding: 1,
  },
  toggleCircle: {
    width: 25,
    height: 25,
    borderRadius: 20,
    paddingBottom: 0,
    paddingTop: 22,
  },
});

export default styles;
