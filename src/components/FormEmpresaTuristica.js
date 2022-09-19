import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const FormEmpresaTuristica = (props) => {

    const [referenceStorage, setReferenceStorage] = useState();
    const [fileName, setFileName] = useState();
    const [pathFile, setPathFile] = useState();
    const [isLoading, setIsLoading] = useState();
    const {onClose} =props

    const FormEmpresaTuristicaSchema = Yup.object().shape({
        nombre: Yup.string().required('Campo requerido'),
        telefono: Yup.string().required('Campo requerido'),
        correo: Yup.string().required('Campo requerido'),
        direccion: Yup.string().required('Campo requerido')
    });

    const handleGallery = async () => {
        const result = await launchImageLibrary();
        if(result.assets.length > 0){
            const tempFileName = result.assets[0].fileName;
            const tempPathFile = result.assets[0].uri;
            setReferenceStorage(storage().ref(tempFileName));
            setFileName(tempFileName);
            setPathFile(tempPathFile);
        }
    };

    const handleForm = (values) => {
        setIsLoading(true);
        referenceStorage.putFile(pathFile).then(response => {
            console.log('exitoso empresa turistica');
            handleFirestore(values);
        }).catch(error => {
            console.log('error', error);
        });
    };

    const handleFirestore = (values) => {
        firestore().collection('empresa_turistica').add({
            ...values,
            imagen: fileName
        }).then(response => {
            Keyboard.dismiss();
            setIsLoading(false);
            onClose();
            console.log('Guardado empresa turistica...');
        }).catch(error => {
            console.log('error', error);
        });
    };

    return(
        <Formik
            initialValues={{nombre:'', telefono:'', correo:'', direccion:''}}
            onSubmit={handleForm}
            validationSchema={FormEmpresaTuristicaSchema}
        >
            {({handleChange, handleSubmit, values, errors}) => (
                <View style={styles.containerForm}>
                    <Text style={styles.labelInput}>Nombre:</Text>
                    <TextInput style={styles.input} value={values.nombre} onChangeText={handleChange('nombre')} placeholder="Nombre..."/>
                    {
                        errors.nombre && (
                        <Text style={styles.messageError}>{errors.nombre}</Text>
                    )}
                    <Text style={styles.labelInput}>Telefono:</Text>
                    <TextInput style={styles.input} value={values.telefono} onChangeText={handleChange('telefono')} placeholder="Telefono..."/>
                    {
                        errors.telefono && (
                        <Text style={styles.messageError}>{errors.telefono}</Text>
                    )}
                    <Text style={styles.labelInput}>Correo:</Text>
                    <TextInput style={styles.input} value={values.correo} onChangeText={handleChange('correo')} placeholder="Correo..."/>
                    {
                        errors.correo && (
                        <Text style={styles.messageError}>{errors.correo}</Text>
                    )}
                    <Text style={styles.labelInput}>Direccion:</Text>
                    <TextInput style={styles.input} value={values.direccion} onChangeText={handleChange('direccion')} placeholder="Direccion..."/>
                    {
                        errors.direccion && (
                        <Text style={styles.messageError}>{errors.direccion}</Text>
                    )}

                    <Text style={styles.labelInput}>Imagen:</Text>
                    <View style={styles.containerImagen}>
                        <View style={{width:'75%' }}>
                            <TextInput 
                            style={styles.input} 
                            value={fileName} 
                            placeholder="Imagen..."
                            />
                        </View>
                        <Button 
                        style={{with:'20%'}} 
                        onPress={handleGallery} 
                        title="Imagen" 
                        />
                    </View>
                    {isLoading ? (
                        <ActivityIndicator color={"#000"} size={50}/>
                    ) : (
                        <Button title="Guardar" onPress={handleSubmit}/>
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
        flexDirection: 'row',
        alignItems:'flex-start'
    }
});

export default FormEmpresaTuristica;