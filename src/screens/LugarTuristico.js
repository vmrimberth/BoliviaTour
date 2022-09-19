//import React from "react";
import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Button, TouchableOpacity, StyleSheet, Text } from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import LinearGradient from "react-native-linear-gradient";

import ItemLugarTuristico from "../components/ItemLugarTuristico";
import ModalLugarTuristico from "../components/ModalLugarTuristico";

const LugarTuristico = () => {

    const [lugarTuristicoList, setLugarTuristicoList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
       getLugarTuristicoList();
    }, []);


    const getLugarTuristicoList = () =>{
        firestore()
        .collection('lugar_turistico')
        //.get()
        .onSnapshot(async (fLugarTuristicoList) => {
            console.log('Total:', fLugarTuristicoList.size)
            let tempLugarTuristicoList = [];
            let promiseImages = [];
            fLugarTuristicoList.forEach(fLugarTuristico => {
                //console.log('Lugar Turistico: ', fLugarTuristico.data())
                tempLugarTuristicoList.push(fLugarTuristico.data());
                promiseImages.push(storage().ref(fLugarTuristico.data().imagen).getDownloadURL());
            });
            const resultPromises = await Promise.all(promiseImages);
            resultPromises.forEach((url, index) => {
                tempLugarTuristicoList[index].imagen = url;
            })
            setLugarTuristicoList(tempLugarTuristicoList);
        });
        //.then();
    };

    const handleModal = () => {
        setIsVisible(true)
    }

    const handleOnClose = () => {
        setIsVisible(false);
    }

    TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
            colors={["#004d40", "#009688"]}
            style={styles.appButtonContainer}
            >
            <Text style={styles.appButtonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
      );

    return(
        <View >
            <FlatList 
                style={{height:'90%'}} 
                data={lugarTuristicoList} 
                renderItem={ItemLugarTuristico}
                keyExtractor={item => item.id}
                />
            
            <AppButton title="Agregar" size="sm" backgroundColor="#007bff" onPress={handleModal}/>
            {isVisible && 
                <ModalLugarTuristico onClose={handleOnClose}/>
            }
        </View>
    );
} 

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16
    },
    appButtonContainer: {
      elevation: 8,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });

export default LugarTuristico;