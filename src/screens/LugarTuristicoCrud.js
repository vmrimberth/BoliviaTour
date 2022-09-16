import React from "react";
import { TextInput, Text, StyleSheet, View } from "react-native";

const LugarTuristicoCrud = () => {

    const [name, onChangeName] = React.useState("");
    const [departamento, onChangeDepartamento] = React.useState("");
    const [provincia, onChangeProvincia] = React.useState("");
    const [localidad, onChangeLocalidad] = React.useState("");
    
    return(
        <View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.labelInput}>Nombre:</Text>
                <TextInput style={styles.input} onChangeText={onChangeName} value={name} placeholder="Nombre lugar turistico..."/>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.labelInput}>Departamento:</Text>
                <TextInput style={styles.input} onChangeText={onChangeDepartamento} value={departamento} placeholder="Departamento..."/>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.labelInput}>Provincia:</Text>
                <TextInput style={styles.input} onChangeText={onChangeProvincia} value={provincia} placeholder="Provincia..."/>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.labelInput}>Localidad:</Text>
                <TextInput style={styles.input} onChangeText={onChangeLocalidad} value={localidad} placeholder="Localidad..."/>
            </View>
        </View>
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
    }
});

export default LugarTuristicoCrud;