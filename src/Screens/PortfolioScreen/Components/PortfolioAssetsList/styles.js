import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    balanceContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    currentBalance:{
        color: 'white',
        fontWeight: '600',
        fontSize: 15,    },
    currentBalanceValue:{
        color: 'white',
        fontWeight: '700',
        fontSize: 26,
        letterSpacing: 1,
    },
    valueChanged:{
        color: 'red',
        fontWeight: '600',
        fontSize: 16,
    },
    percentChanged:{
        color: 'white',
        fontWeight: '500',
        fontSize: 17,
        
    },
    priceChangeContainer:{
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    assetsLabel:{
        color: 'white',
        fontSize: 23,
        fontWeight: '700',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    buttonContainer:{
        backgroundColor: '#4169E1',
        padding:12,
        alignItems:'center',
        marginVertical: 25,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText:{
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    }

})

export default styles;