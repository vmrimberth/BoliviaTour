import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import * as RootNavigation from '../utils/RootNavigation'

const ItemLugarTuristico = ({item}) => {
    //console.log("item: ", item)
    const handleNavigation = () => {
        RootNavigation.navigate('LugarTuristicoDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    };

    return (
        <TouchableOpacity style={styles.containerItem} onPress={handleNavigation}>
            <View style={styles.imgContainer}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </View>
            
            <View style={styles.descriptionContainer}>
                <Text style={styles.itemTxtLugarTuristico}>{item.nombre}</Text>
                <Text style={styles.itemTxtLugarTuristico}>{item.departamento}</Text>
                <Text style={styles.itemTxtLugarTuristico}>{item.provincia}</Text>
                <Text style={styles.itemTxtLugarTuristico}>{item.municipio}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    input:{
        height:40,
        margin:13,
        borderWidth:1,
        padding:10
    },
    labelInput:{
        fontWeight:'bold'
    },
    containerItem:{
        flexDirection: 'row',
        padding:10,
        backgroundColor:'white',
        margin:10,
        elevation:5,
        borderRadius:5
    },
    itemTxtLugarTuristico:{
        fontSize:14,
        fontWeight:'bold',
        color:'#000'
    },
    imgContainer:{
        width:'30%'
    },
    descriptionContainer:{
        width:'70%'
    }
});

export default ItemLugarTuristico;