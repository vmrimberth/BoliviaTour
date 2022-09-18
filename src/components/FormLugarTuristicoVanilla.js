import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View, Button } from "react-native";
import firestore from '@react-native-firebase/firestore';

const FormLugarTuristicoVanilla = () => {

    const [name, setName] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [provincia, setProvincia] = useState("");
    const [municipio, setMunicipio] = useState("");
    
    const [isValidName, setIsValidName] = useState(true)
    const [isValidDepartamento, setIsValidDepartamento] = useState(true)
    const [isValidProvincia, setIsValidProvincia] = useState(true)
    const [isValidMunicipio, setIsValidMunicipio] = useState(true)

    const handleForm = () => {
        
        setIsValidName(!(name===''))
        setIsValidDepartamento(!(departamento===''))
        setIsValidProvincia(!(provincia===''))
        setIsValidMunicipio(!(municipio===''))

        firestore().collection('lugares_turisticos').add({
            nombre:name,
            departamento:departamento,
            provincia: provincia,
            municipio: municipio
        }).then(()=>{console.log("Lugar turistico registrado")});
    }

    const handleName = (text) => {
        setName(text);
    }

    const handleDepartamento = (text) => {
        setDepartamento(text);
    }

    const handleProvincia = (text) => {
        setProvincia(text);
    }

    const handleMunicipio = (text) => {
        setMunicipio(text);
    }

    return(
        <View style={styles.containerForm}>
                <Text style={styles.labelInput}>Nombre:</Text>
                <TextInput style={styles.input} value={name} onChangeText={handleName} placeholder="Nombre lugar turistico..."/>
                {
                    !isValidName && 
                    <Text style={styles.messageError}>Campo requerido</Text>
                }
                <Text style={styles.labelInput}>Departamento:</Text>
                <TextInput style={styles.input} value={departamento} onChangeText={handleDepartamento} placeholder="Departamento..."/>
                {
                    !isValidDepartamento && 
                    <Text style={styles.messageError}>Campo requerido</Text>
                }
                <Text style={styles.labelInput}>Provincia:</Text>
                <TextInput style={styles.input} value={provincia} onChangeText={handleProvincia} placeholder="Provincia..."/>
                {
                    !isValidProvincia && 
                    <Text style={styles.messageError}>Campo requerido</Text>
                }
                <Text style={styles.labelInput}>Municipio:</Text>
                <TextInput style={styles.input} value={municipio} onChangeText={handleMunicipio} placeholder="Municipio..."/>
                {
                    !isValidMunicipio && 
                    <Text style={styles.messageError}>Campo requerido</Text>
                }
                <Button title="Guardar" onPress={handleForm}/>
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius: 5,
        paddingLeft:10,
        marginBottom: 10
    },
    labelInput:{
        fontWeight:'bold'
    },
    containerForm: {
        padding:15
    },
    messageError: {
        color: 'red',
        fontSize:10
    }
});

export default FormLugarTuristicoVanilla;