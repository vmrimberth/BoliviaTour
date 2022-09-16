import React, { useState } from "react";
import { TextInput, Text, StyleSheet, View, Button } from "react-native";
import firestore from '@react-native-firebase/firestore';

const FormLugarTuristico = () => {

    const [name, setName] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [provincia, setProvincia] = useState("");
    const [localidad, setLocalidad] = useState("");

    const [isValidName, setIsValidName] = useState(true)
    const [isValidDepartamento, setIsValidDepartamento] = useState(true)
    const [isValidProvincia, setIsValidProvincia] = useState(true)
    const [isValidLocalidad, setIsValidLocalidad] = useState(true)

    const handleForm = () => {
        
        setIsValidName(!(name===''))
        setIsValidDepartamento(!(departamento===''))
        setIsValidProvincia(!(provincia===''))
        setIsValidLocalidad(!(localidad===''))

        firestore().collection('lugares_turisticos').add({
            nombre:name,
            departamento:departamento,
            provincia: provincia,
            localidad: localidad
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

    const handleLocalidad = (text) => {
        setLocalidad(text);
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
                <Text style={styles.labelInput}>Localidad:</Text>
                <TextInput style={styles.input} value={localidad} onChangeText={handleLocalidad} placeholder="Localidad..."/>
                {
                    !isValidLocalidad && 
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

export default FormLugarTuristico;