import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    ticker:{
        flexDirection:'row', 
        alignItems:'center', 
    },
    title:{
        color:'white', 
        fontWeight:'bold', 
        marginHorizontal:10, 
        fontSize:18
    },
    rankContainer:{
        backgroundColor: '#585858',
        borderRadius: 5,
        paddingHorizontal: 5,
        marginRight: 5,
      },
     
  
  });
  
  export default styles;