import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    currentPrice: {
        color:'white',  
        fontSize: 18,
        fontWeight:'600', 
        letterSpacing:1
    },
    name:{
        color:'white', 
        fontSize:15,
    },
    change:{
        color:'white', 
        fontSize:15,
        fontWeight:'500'
    },
    priceContainer:{
        padding:8, 
        flexDirection:'row',  
        justifyContent: 'space-between', 
        alignItems:'center'
    },
    priceChangeContainer:{
        backgroundColor:'red',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    input:{
        width: 150,
        height:40,
        margin:12,
        borderBottomWidth:1,
        borderBottomColor: 'white',
        padding: 10,
        fontSize: 16,
        color: 'white'
      }
  
  });
  
  export default styles;