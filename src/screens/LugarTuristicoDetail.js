import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {getLugarTuristicoById} from '../services/service'
import DetailStyle from "./DetailStyle";

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
            <Image style={DetailStyle.image} source={{ uri: imagen }} />
            <View style={DetailStyle.container}>
              <Text style={DetailStyle.title}>{lugarTuristico?.nombre?.stringValue}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Departamento: </Text>
                <Text style={DetailStyle.detail}>{lugarTuristico?.departamento?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Provincia: </Text>
                <Text style={DetailStyle.detail}>{lugarTuristico?.provincia?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Municipio: </Text>
                <Text style={DetailStyle.detail}>{lugarTuristico?.municipio?.stringValue}</Text>
              </View>
            </View>
        </View>
    );
};

export default LugarTuristicoDetail;