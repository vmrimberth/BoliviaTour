import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const ItemHotel = ({item}) => {
    return(
        <View style={styles.containerItem}>
            <View style={styles.imgContainer}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.itemTxtHotel}>{item.nombre}</Text>
                <Text style={styles.itemTxtHotel}>{item.telefono}</Text>
                <Text style={styles.itemTxtHotel}>{item.correo}</Text>
                <Text style={styles.itemTxtHotel}>{item.direccion}</Text>
            </View>
        </View>
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