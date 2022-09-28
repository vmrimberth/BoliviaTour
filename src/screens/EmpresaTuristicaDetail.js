import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {getEmpresaTuristicaById} from '../services/service'
import DetailStyle from "./DetailStyle";

const EmpresaTuristicaDetail = ({navigation, route}) => {

    const [empresaTuristica, setEmpresaTuristica] = useState({});
    const { firestoreId, imagen } = route.params

    //console.log('params', route.params);
    useEffect(() => {
        getEmpresaTuristica()
      }, [])
    
    const getEmpresaTuristica = async () => {
        const result = await getEmpresaTuristicaById(firestoreId)
        setEmpresaTuristica(result.data.fields)
    }

    return(
        <View>
            <Image style={DetailStyle.image} source={{ uri: imagen }} />
            <View style={DetailStyle.container}>
              <Text style={DetailStyle.title}>{empresaTuristica?.nombre?.stringValue}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Correo: </Text>
                <Text style={DetailStyle.detail}>{empresaTuristica?.correo?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Telefono: </Text>
                <Text style={DetailStyle.detail}>{empresaTuristica?.telefono?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Direccion: </Text>
                <Text style={DetailStyle.detail}>{empresaTuristica?.direccion?.stringValue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={DetailStyle.description}>Like: </Text>
                <Text style={DetailStyle.detail}>{empresaTuristica?.like?.integerValue}</Text>
              </View>
            </View>
        </View>
    );
};

export default EmpresaTuristicaDetail