import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {getHotelById} from '../services/service'
import DetailStyle from "./DetailStyle";

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
            <Image style={DetailStyle.image} source={{ uri: imagen }} />
            <View style={DetailStyle.container}>
              <Text style={DetailStyle.title}>{hotel?.nombre?.stringValue}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Correo: </Text>
                <Text style={DetailStyle.detail}>{hotel?.correo?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Telefono: </Text>
                <Text style={DetailStyle.detail}>{hotel?.telefono?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Direccion: </Text>
                <Text style={DetailStyle.detail}>{hotel?.direccion?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Like: </Text>
                <Text style={DetailStyle.detail}>{hotel?.like?.integerValue}</Text>
              </View>
            </View>
        </View>
    );
};

export default HotelDetail