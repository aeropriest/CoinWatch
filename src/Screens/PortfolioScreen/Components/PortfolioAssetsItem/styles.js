import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    coinContainer:{
        flexDirection: 'row',
        padding: 15,
    },
    title:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    symbol:{
        color: 'grey',
        fontWeight: '600',
    },
    qtyContainer:{
        marginLeft: 'auto',
        alignItems: 'flex-end'
    }

})

export default styles;