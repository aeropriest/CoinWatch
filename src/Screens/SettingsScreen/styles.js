import { StyleSheet } from "react-native";
 export const lightMode = StyleSheet.create({
    screen:{
        backgroundColor:"#ffffff",
        flex:1
    },
    container:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#121212",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,   
      },
    switchContainer:{
        flexDirection: "row",
        alignSelf: "center",
        paddingHorizontal: 5,
        justifyContent: "space-betweens",
      },
      text:{ color: "#121212", alignSelf: "center" },
      toggleContainer:{
        marginTop: 1,
        width: 45,
        height: 27,
        borderRadius: 25,
        padding: 1,
      },
      toggleCircle:{
        width: 25,
        height: 25,
        borderRadius: 20,
        paddingBottom: 0,
        paddingTop: 22,
      }
});

    export const darkMode = StyleSheet.create({
        screen:{
            backgroundColor:"#121212",
            flex:1
        },
        container:{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "grey",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,   
          },
        switchContainer:{
            flexDirection: "row",
            alignSelf: "center",
            paddingHorizontal: 5,
            justifyContent: "space-betweens",
          },
          text:{ color: "white", alignSelf: "center" },
          toggleContainer:{
            marginTop: 1,
            width: 45,
            height: 27,
            borderRadius: 25,
            padding: 1,
          },
          toggleCircle:{
            width: 25,
            height: 25,
            borderRadius: 20,
            paddingBottom: 0,
          }
        });
    
    export default lightMode;

