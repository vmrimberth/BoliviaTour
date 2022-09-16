import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormLugarTuristico from "./FormLugarTuristico";

const ModalLugarTuristico = () =>{
    return(
        <View style={styles.container}>
            <View style={styles.childContainer}>
                <Text>Agregar Lugar Turistico</Text>
                <FormLugarTuristico/>
            </View>
                       
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        backgroundColor: 'transparent',
        zIndex: 1010,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    childContainer:{
        height: '70%',
        width: '80%',
        backgroundColor: '#FFF',
        elevation: 5,
        borderRadius: 5
    }
})

export default ModalLugarTuristico;