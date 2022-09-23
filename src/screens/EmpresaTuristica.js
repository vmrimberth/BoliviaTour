import React, { useEffect, useState } from "react";
import { Button, FlatList, View, StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ItemEmpresaTuristica from "../components/ItemEmpresaTuristica";
import ModalEmpresaTuristica from "../components/ModalEmpresaTuristica";

const EmpresaTuristica = () => {
    
    const [empresaTuristicaList, setEmpresaTuristicaList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getEmpresaTuristicaList();
    }, [])

    const getEmpresaTuristicaList = () => {
        firestore()
        .collection('empresa_turistica')
        .onSnapshot(async (fEmpresaTuristicaList) => {
            console.log('Total:', fEmpresaTuristicaList.size)
            let tempEmpresaTuristicaList = [];
            let promiseImgEmpresaTuristica = [];

            fEmpresaTuristicaList.forEach(fEmpresaTuristica => {
                tempEmpresaTuristicaList.push(fEmpresaTuristica.data())
                promiseImgEmpresaTuristica.push(storage().ref(fEmpresaTuristica.data().imagen).getDownloadURL());
            });

            const resultPromises = await Promise.all(promiseImgEmpresaTuristica);

            resultPromises.forEach((url, index) => {
                tempEmpresaTuristicaList[index].imagen = url;
            });

            setEmpresaTuristicaList(tempEmpresaTuristicaList);
        });
    };

    const handleModal = () => {
        setIsVisible(true);
    }
    
    const handleOnClose = () => {
        setIsVisible(false)
    }

    return(
        <View style={styles.screenContainer}>
            <FlatList
                style={{height:'90%'}}
                data={empresaTuristicaList}
                renderItem={ItemEmpresaTuristica}
                keyExtractor={item => item.id}
            />
            <Button style={{height:'10%'}} title="Agregar" onPress={handleModal}/>
            {
                isVisible && 
                <ModalEmpresaTuristica onClose={handleOnClose}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 1
    }
  });
export default EmpresaTuristica;