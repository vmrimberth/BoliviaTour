import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FormStyle from "./FormStyle";

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

    const handleClose = () => {
        onClose()
    }

    return(
        <Formik
            initialValues={{nombre:'', telefono:'', correo:'', direccion:''}}
            onSubmit={handleForm}
            validationSchema={FormEmpresaTuristicaSchema}
        >
            {({handleChange, handleSubmit, values, errors}) => (
                <View style={FormStyle.containerForm}>
                    <Text style={FormStyle.labelInput}>Nombre:</Text>
                    <TextInput style={FormStyle.input} value={values.nombre} onChangeText={handleChange('nombre')} placeholder="Nombre..."/>
                    {
                        errors.nombre && (
                        <Text style={FormStyle.messageError}>{errors.nombre}</Text>
                    )}
                    <Text style={FormStyle.labelInput}>Telefono:</Text>
                    <TextInput style={FormStyle.input} value={values.telefono} onChangeText={handleChange('telefono')} placeholder="Telefono..." keyboardType="numeric"/>
                    {
                        errors.telefono && (
                        <Text style={FormStyle.messageError}>{errors.telefono}</Text>
                    )}
                    <Text style={FormStyle.labelInput}>Correo:</Text>
                    <TextInput style={FormStyle.input} value={values.correo} onChangeText={handleChange('correo')} placeholder="Correo..." type='email' keyboardType="email-address"/>
                    {
                        errors.correo && (
                        <Text style={FormStyle.messageError}>{errors.correo}</Text>
                    )}
                    <Text style={FormStyle.labelInput}>Direccion:</Text>
                    <TextInput style={FormStyle.input} value={values.direccion} onChangeText={handleChange('direccion')} placeholder="Direccion..."/>
                    {
                        errors.direccion && (
                        <Text style={FormStyle.messageError}>{errors.direccion}</Text>
                    )}

                    <Text style={FormStyle.labelInput}>Imagen:</Text>
                    <View style={FormStyle.containerImagen}>
                        <View style={{width:'75%' }}>
                            <TextInput 
                            style={FormStyle.input} 
                            value={fileName} 
                            placeholder="Imagen..."
                            />
                        </View>
                        <Button 
                        color='#f56436'
                        style={{with:'20%'}} 
                        onPress={handleGallery} 
                        title="Imagen" 
                        />
                    </View>
                    {isLoading ? (
                        <ActivityIndicator color={"#000"} size={50}/>
                    ) : (
                        <View style={FormStyle.containerButton}>
                            <Button title="Guardar" color='#f56436' onPress={handleSubmit}/>
                            <Button title="Cancelar" color='#f56436' onPress={handleClose}/>
                        </View>
                    )}
                </View>
            )}
        </Formik>
    );
}

export default FormEmpresaTuristica;