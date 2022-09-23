import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const FormLugarTuristico = (props) => {
    
    const [referenceStorage, setReferenceStorage] = useState();
    const [fileName, setFileName] = useState();
    const [pathFile, setPathFile] = useState();
    const [isLoading, setIsLoading] = useState();
    const {onClose} = props

    const FormLugarTuristicoSchema = Yup.object().shape({
        nombre: Yup.string().required('Campo requerido'),
        departamento: Yup.string().required('Campo requerido'),
        provincia: Yup.string().required('Campo requerido'),
        municipio: Yup.string().required('Campo requerido'),
        //imagen: Yup.string().required('Campo requerido')
    });

    const handleGallery = async () => {
        // You can also use as a promise without 'callback':
        const result = await launchImageLibrary();
        if(result.assets.length > 0){
            const tempFileName = result.assets[0].fileName;
            const tempPathFile = result.assets[0].uri;
            setReferenceStorage(storage().ref(tempFileName))
            setFileName(tempFileName)
            setPathFile(tempPathFile)
        }
        //console.log('result', result)
    };

    const handleForm = (values) => {
        //values => console.log('values ',values)
        setIsLoading(true);
        referenceStorage.putFile(pathFile).then(response => {
            console.log('exitoso')
            handleFirestore(values)
        }).catch(error => {
            console.log('error', error)
        })
    }

    const handleFirestore = (values) => {
        firestore()
        .collection('lugar_turistico')
        .add({
            ...values, 
            imagen: fileName
        })
        .then(response => {
            Keyboard.dismiss();
            setIsLoading(false);
            onClose();
            console.log('Guardado...');
        })
        .catch(error => {
            console.log('error', error)
        });
    };

    const handleClose = () => {
        onClose()
    }

    return (
        <Formik
            initialValues={{nombre:'', departamento:'', provincia:'', municipio:''}}
            onSubmit={handleForm}
            validationSchema={FormLugarTuristicoSchema}
        >
            {({handleChange, handleSubmit, values, errors}) => (
                <View style={styles.containerForm}>
                    <Text style={styles.labelInput}>Nombre:</Text>
                    <TextInput style={styles.input} value={values.nombre} onChangeText={handleChange('nombre')} placeholder="Nombre lugar turistico..."/>
                    {
                        errors.nombre && (
                        <Text style={styles.messageError}>{errors.nombre}</Text>
                    )}
                    <Text style={styles.labelInput}>Departamento:</Text>
                    <TextInput style={styles.input} value={values.departamento} onChangeText={handleChange('departamento')} placeholder="Departamento..."/>
                    {
                        errors.departamento && (
                        <Text style={styles.messageError}>{errors.departamento}</Text>
                    )}
                    <Text style={styles.labelInput}>Provincia:</Text>
                    <TextInput style={styles.input} value={values.provincia} onChangeText={handleChange('provincia')} placeholder="Provincia..."/>
                    {
                        errors.provincia && (
                        <Text style={styles.messageError}>{errors.provincia}</Text>
                    )}
                    <Text style={styles.labelInput}>Municipio:</Text>
                    <TextInput style={styles.input} value={values.municipio} onChangeText={handleChange('municipio')} placeholder="Municipio..."/>
                    {
                        errors.municipio && (
                        <Text style={styles.messageError}>{errors.municipio}</Text>
                    )}

                    <Text style={styles.labelInput}>Imagen:</Text>
                    <View style={styles.containerImagen}>
                        <View style={{width:'100%' }}>
                            <TextInput 
                            style={styles.input} 
                            value={fileName} 
                            //onChangeText={handleChange('imagen')} 
                            placeholder="Imagen..."
                            />
                            {/*
                                errors.imagen && (
                                <Text style={styles.messageError}>{errors.imagen}</Text>
                                )*/}
                        </View>
                        <Button 
                        style={{with:'15%'}} 
                        onPress={handleGallery} 
                        title="Imagen" 
                        />
                    </View>
                    {isLoading ? (
                        <ActivityIndicator color={"#000"} size={50}/>
                    ) : (
                        <View style={styles.containerButton}>
                            <Button title="Guardar" onPress={handleSubmit}/>
                            <Button title="Cancelar" onPress={handleClose}/>
                        </View>
                    )}
                </View>
            )}

        </Formik>
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
    },
    containerImagen:{
        justifyContent:'space-between',
        flexDirection: 'row'
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent:'space-between'
    }
});

export default FormLugarTuristico;