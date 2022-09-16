//import React from "react";
import React, { useEffect, useState } from "react";
import { TextInput, Text, StyleSheet, View, SafeAreaView, FlatList, Image } from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const LugarTuristico = () => {

    const [name, onChangeName] = useState("");
    const [lugarTuristicoList, setLugarTuristicoList] = useState([]);

    useEffect(() => {
       getLugarTuristicoList();
    }, []);

    const getLugarTuristicoList = () =>{
        firestore()
        .collection('lugares_turisticos')
        .get()
        .then(async (fLugarTuristicoList) => {
            console.log('Total:', fLugarTuristicoList.size)
            let tempLugarTuristicoList = [];
            let promiseImages = [];
            fLugarTuristicoList.forEach(fLugarTuristico => {
                //console.log('Lugar Turistico: ', fLugarTuristico.data())
                tempLugarTuristicoList.push(fLugarTuristico.data());
                promiseImages.push(storage().ref(fLugarTuristico.data().imagen).getDownloadURL());
                //console.log(storage().ref(fLugarTuristico.data().imagen).getDownloadURL());
                console.log(fLugarTuristico.data())
            });
            const resultPromises = await Promise.all(promiseImages);
            //console.log("resultPromise", resultPromises);
            
            resultPromises.forEach((url, index) => {
                tempLugarTuristicoList[index].imagen = url;
            })
            setLugarTuristicoList(tempLugarTuristicoList);
        })
    }

    const ItemLugarTuristico = ({item}) => {
        console.log("item: ", item)
        return (
            <View style={styles.containerItem}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
                <Text style={styles.itemTxtLugarTuristico}>{item.nombre}</Text>
                <Text style={styles.itemTxtLugarTuristico}>{item.departamento}</Text>
                <Text style={styles.itemTxtLugarTuristico}>{item.provincia}</Text>
                <Text style={styles.itemTxtLugarTuristico}>{item.localidad}</Text>
            </View>
        );
    }
    return(
        <SafeAreaView >
            <FlatList
                data={lugarTuristicoList}
                renderItem={ItemLugarTuristico}
                />
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    input:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10
    },
    labelInput:{
        fontWeight:'bold'
    },
    containerItem:{
        flexDirection:'row',
        padding:10,
        backgroundColor:'white',
        margin:10,
        elevation:5,
        borderRadius:5,
        justifyContent:'space-between',
        alignItems:'center'
    },
    itemTxtLugarTuristico:{
        fontSize:14,
        fontWeight:'bold',
        color:'#000'
    }
});

export default LugarTuristico;