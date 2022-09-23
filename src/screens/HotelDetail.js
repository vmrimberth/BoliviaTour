import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {getHotelById} from '../services/service'


const HotelDetail = ({navigation, route}) => {
    const [hotel, setHotel] = useState({});
    const { firestoreId, imagen } = route.params

    useEffect(() => {
        getHotel()
      }, [])
    
    const getHotel = async () => {
        const result = await getHotelById(firestoreId)
        setHotel(result.data.fields)
    }

    return(
        <View>
            <Image style={styles.image} source={{ uri: imagen }} />
            <Text style={styles.title}>{hotel?.nombre?.stringValue}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.description}>Correo: </Text>
              <Text style={styles.detail}>{hotel?.correo?.stringValue}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.description}>Telefono: </Text>
              <Text style={styles.detail}>{hotel?.telefono?.stringValue}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.description}>Direccion: </Text>
              <Text style={styles.detail}>{hotel?.direccion?.stringValue}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: '50%',
      resizeMode: 'cover'
    },
    title: {
      textAlign: 'center',
      fontWeight:'bold',
      margin:15,
      fontSize: 25,
      color: '#000'
    },
    detail: {
      color: '#000',
      fontSize: 15,
      paddingHorizontal: 10,
      borderRadius: 10
    },
    description: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 15,
      paddingHorizontal: 10,
      borderRadius: 10
    }
  })

export default HotelDetail