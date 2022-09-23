import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import * as RootNavigation from '../utils/RootNavigation'

const ItemHotel = ({item}) => {

    const handleNavigation = () => {
        RootNavigation.navigate('HotelDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    }

    return(
        <TouchableOpacity style={styles.containerItem} onPress={handleNavigation}>
            <View style={styles.imgContainer}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.itemTxtHotel}>{item.nombre}</Text>
                <Text style={styles.itemTxtHotel}>{item.direccion}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
        elevation: 5,
        borderRadius:5
    },
    itemTxtHotel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },
    imgContainer: {
        width: '30%'
    },
    descriptionContainer: {
        width: '70%'
    }
});

export default ItemHotel