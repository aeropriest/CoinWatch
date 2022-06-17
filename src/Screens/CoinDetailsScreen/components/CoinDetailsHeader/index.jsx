import {View, Text, Image} from 'react-native';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';


const CoinDetailsHeader = (props) => {    
    const {image, name, symbol, marketCapRank} = props;
  return (
        <View style={styles.header}>
            <Ionicons name="chevron-back" size={30} color="white" />
            <View style={styles.ticker}>
                <Image
                    source={{uri: image}} 
                    style={{width:20, aspectRatio:1}}
                    />
                <Text style={styles.title}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                <Text style={{color:'white', fontWeight:'bold', fontSize: 15}}>#{marketCapRank}</Text>
                </View>
            </View>
            <FontAwesome5 name="user-circle" size={25} color="white" />
        </View>
      )
}

export default CoinDetailsHeader