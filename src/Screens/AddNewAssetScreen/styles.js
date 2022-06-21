import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    dropDownContainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    items:{
        padding: 10,
        marginTop: 2,
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#444444",
    },
    ticker:{
        color: 'grey',
        fontWeight: '700',
        fontSize: 20,
        marginTop: 25,
        marginLeft: 5
    },
    boughtQtyContainer:{
        flex:1,
        alignItems:'center',
        marginTop: 50,
    },
    buttonContainer:{
        backgroundColor: '#4169E1',
        padding:12,
        alignItems:'center',
        marginVertical: 30,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    buttonText:{
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },
    pricePerCoin:{
        color:'grey',
        fontWeight: '600',
        fontSize: 17,
        letterSpacing: 0.5
    }

  });
  
  export default styles;