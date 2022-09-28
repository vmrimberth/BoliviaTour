import React, {useState} from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FormStyle from "./FormStyle";

const FormLugarTuristico = (props) => {
    //console.log(props)
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
        //console.log('values ',values)
        setIsLoading(true);
        referenceStorage.putFile(pathFile).then(response => {
            console.log('exitoso')
            handleFirestore(values)
        }).catch(error => {
            console.log('error', error)
        })
    }

    const handleFirestore = (values) => {
        var _col = 0;
        firestore()
        .collection('lugar_turistico')
        .get()
        .then(querySnapshot => {
            _col = querySnapshot.size+1;
            //console.log(_col)

            firestore()
            .collection('lugar_turistico')
            .add({
                ...values, 
                imagen: fileName,
                id:_col,
                like:0
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
        }).catch(e => {console.log(e)});
    };

    const handleClose = () => {
        onClose()
    }

    return (
        <Formik
            initialValues={{nombre:'', departamento:'', provincia:'', municipio:'', ubicacion:{latitude:'', longitude:''}}}
            onSubmit={handleForm}
            validationSchema={FormLugarTuristicoSchema}
        >
            {({handleChange, handleSubmit, values, errors}) => (
                <View style={FormStyle.containerForm}>
                    <Text style={FormStyle.labelInput}>Nombre:</Text>
                    <TextInput style={FormStyle.input} value={values.nombre} onChangeText={handleChange('nombre')} placeholder="Nombre lugar turistico..."/>
                    {
                        errors.nombre && (
                        <Text style={FormStyle.messageError}>{errors.nombre}</Text>
                    )}
                    <Text style={FormStyle.labelInput}>Departamento:</Text>
                    <TextInput style={FormStyle.input} value={values.departamento} onChangeText={handleChange('departamento')} placeholder="Departamento..."/>
                    {
                        errors.departamento && (
                        <Text style={FormStyle.messageError}>{errors.departamento}</Text>
                    )}
                    <Text style={FormStyle.labelInput}>Provincia:</Text>
                    <TextInput style={FormStyle.input} value={values.provincia} onChangeText={handleChange('provincia')} placeholder="Provincia..."/>
                    {
                        errors.provincia && (
                        <Text style={FormStyle.messageError}>{errors.provincia}</Text>
                    )}
                    <Text style={FormStyle.labelInput}>Municipio:</Text>
                    <TextInput style={FormStyle.input} value={values.municipio} onChangeText={handleChange('municipio')} placeholder="Municipio..."/>
                    {
                        errors.municipio && (
                        <Text style={FormStyle.messageError}>{errors.municipio}</Text>
                    )}

                    <Text style={FormStyle.labelInput}>Ubicacion:</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TextInput style={{borderWidth:1,borderRadius: 5,width:'45%'}} value={values.ubicacion.latitude} onChangeText={handleChange('ubicacion.latitude')} placeholder="Latitud..." keyboardType="number" type='numeric'/>
                        <TextInput style={{borderWidth:1,borderRadius: 5,width:'45%'}} value={values.ubicacion.longitude} onChangeText={handleChange('ubicacion.longitude')} placeholder="Longitud..." keyboardType="number" type='numeric'/>
                    </View>
                    

                            

                    <Text style={FormStyle.labelInput}>Imagen:</Text>
                    <View style={FormStyle.containerImagen}>
                        <View style={{width:'75%' }}>
                            <TextInput 
                            style={FormStyle.input} 
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
                        color='#f56436'
                        style={{with:'15%'}} 
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

export default FormLugarTuristico;