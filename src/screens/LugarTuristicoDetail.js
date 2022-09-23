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
            <Text style={styles.title}>{lugarTuristico?.nombre?.stringValue}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.description}>Departamento: </Text>
              <Text style={styles.detail}>{lugarTuristico?.departamento?.stringValue}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.description}>Provincia: </Text>
              <Text style={styles.detail}>{lugarTuristico?.provincia?.stringValue}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.description}>Municipio: </Text>
              <Text style={styles.detail}>{lugarTuristico?.municipio?.stringValue}</Text>
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


export default LugarTuristicoDetail;