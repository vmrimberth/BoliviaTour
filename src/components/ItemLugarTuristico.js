import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import * as RootNavigation from '../utils/RootNavigation'

const ItemLugarTuristico = ({item}) => {
    //console.log("item: ", item)
    const handleNavigation = () => {
        RootNavigation.navigate('LugarTuristicoDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    };

    const handleNavigationUbicacion = () => {
        //console.log("item: ", item)
        RootNavigation.navigate('LugarTuristicoMap', {ubicacion:item.ubicacion});
    };

    return (
        <View style={styles.containerItem} >
            <TouchableOpacity style={styles.imgContainer} onPress={handleNavigation}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </TouchableOpacity>
            
            <View style={styles.descriptionContainer}>
                <View>
                    <Text style={styles.itemTxtLugarTuristico}>{item.nombre}</Text>
                    <Text style={styles.itemTxtLugarTuristico}>{item.departamento}</Text>
                
                    <Button style={{backgroundColor:'#1e90ff', color:"#841584"}} title="Ubicacion" onPress={handleNavigationUbicacion}/>
                </View>
            </View>
        </View>
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
        flexDirection: 'column',
        width:'70%'
    }
});

export default ItemLugarTuristico;