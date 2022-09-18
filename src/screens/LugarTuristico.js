//import React from "react";
import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Button } from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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

    return(
        <View >
            <FlatList 
                style={{height:'90%'}} 
                data={lugarTuristicoList} 
                renderItem={ItemLugarTuristico}
                keyExtractor={item => item.id}
                />
            <Button style={{height:'10%'}} title="Agregar" onPress={handleModal}/>
            {isVisible && 
                <ModalLugarTuristico onClose={handleOnClose}/>
            }
        </View>
    );
} 


export default LugarTuristico;