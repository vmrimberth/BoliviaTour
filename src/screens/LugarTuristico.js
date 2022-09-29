//import React from "react";
import React, { useEffect, useState } from "react";
import { View, FlatList, StatusBar, StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {FAB} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';

import ItemLugarTuristico from "../components/ItemLugarTuristico";
import ModalLugarTuristico from "../components/ModalLugarTuristico";

const LugarTuristico = (props) => {

    //console.log('props', props)

    const [lugarTuristicoList, setLugarTuristicoList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [sizeFlat, setSizeFlat] = useState(0);

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
                //console.log('Lugar Turistico: ', fLugarTuristico.id)
                tempLugarTuristicoList.push({...fLugarTuristico.data(), firebaseId: fLugarTuristico.id});
                promiseImages.push(storage().ref(fLugarTuristico.data().imagen).getDownloadURL());
            });
            const resultPromises = await Promise.all(promiseImages);
            resultPromises.forEach((url, index) => {
                tempLugarTuristicoList[index].imagen = url;
            })
            //console.log(tempLugarTuristicoList)
            
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

    return(
        <View style={styles.screenContainer}>
            <StatusBar
                animated={true}
                backgroundColor="#f4511e"
                 />
            <FlatList 
                style={{height:'90%'}} 
                data={lugarTuristicoList} 
                renderItem={ItemLugarTuristico}
                keyExtractor={item => item.id}
                />
            
            <FAB
                placement='right'
                size='large'
                upperCase={true}
                icon={<Icon name = { 'add' } size = { 25 } color = { '#f0edf6' } />}
                buttonStyle={{backgroundColor:'#f4511e'}}
                onPress={handleModal}
            />
            {isVisible && 
                <ModalLugarTuristico onClose={handleOnClose} size_lista={ItemLugarTuristico.length}/>
            }
        </View>
    );
} 

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 1
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