import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../Screens/HomeScreen";
import CoindDetailsScreen from "../Screens/CoinDetailsScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <Stack.Navigator 
            initialRouteName="HomeScreen"
            screenOptions={{headerShown:false}}
        >
        <Stack.Screen name={"HomeScreen"} component={HomeScreen}/>
        <Stack.Screen name={"CoinDetailsScreen"} component={CoindDetailsScreen}/>
    </Stack.Navigator>
    )
}
export default Navigation;