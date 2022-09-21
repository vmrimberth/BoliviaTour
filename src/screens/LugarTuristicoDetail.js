import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {getLugarTuristicoById} from '../services/service'


const LugarTuristicoDetail = ({navigation, route}) => {

    const [lugarTuristico, setLugarTuristico] = useState({});
    const { firestoreId, imagen } = route.params

    //console.log('params', route.params);

    useEffect(() => {
        getLugarTuristico()
      }, [])
    
    const getLugarTuristico = async () => {
        const result = await getLugarTuristicoById(firestoreId)
        setLugarTuristico(result.data.fields)
        //console.log('result', lugarTuristico)
    }

    return(
        <View>
            <Image style={styles.image} source={{ uri: imagen }} />
            <View style={styles.contentInformation}>
                <Text style={styles.title}>{lugarTuristico?.nombre?.stringValue}</Text>
                <Text style={styles.title}>{lugarTuristico?.departamento?.stringValue}Bs.</Text>
            </View>
        <Text style={styles.description}>
            {
            lugarTuristico?.nombre?.stringValue
            }
        </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: '50%',
      resizeMode: 'cover'
    },
    contentInformation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10
    },
    title: {
      fontSize: 25,
      color: '#000'
    },
    price: {
      fontSize: 15,
      color: '#FFF',
      backgroundColor: '#666',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10
    },
    description: {
      fontSize: 15,
      textAlign: 'justify',
      marginHorizontal: 10,
      marginTop: 10
    }
  })


export default LugarTuristicoDetail;