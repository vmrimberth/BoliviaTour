import React, { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ItemHotel from "../components/ItemHotel";
import ModalHotel from "../components/ModalHotel";

const Hotel = () => {
    
    const [hotelList, setHotelList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getHotelList();
    }, [])

    const getHotelList = () => {
        firestore()
        .collection('hotel')
        .onSnapshot(async (fHotelList) => {
            console.log('Total:', fHotelList.size)
            let tempHotelList = [];
            let promiseImgHotel = [];

            fHotelList.forEach(fHotel => {
                tempHotelList.push(fHotel.data())
                promiseImgHotel.push(storage().ref(fHotel.data().imagen).getDownloadURL());
            });

            const resultPromises = await Promise.all(promiseImgHotel);

            resultPromises.forEach((url, index) => {
                tempHotelList[index].imagen = url;
            });

            setHotelList(tempHotelList);
        });
    };

    const handleModal = () => {
        setIsVisible(true);
    }
    
    const handleOnClose = () => {
        setIsVisible(false)
    }

    return(
        <View>
            <FlatList
                style={{height:'90%'}}
                data={hotelList}
                renderItem={ItemHotel}
                keyExtractor={item => item.id}
            />
            <Button style={{height:'10%'}} title="Agregar" onPress={handleModal}/>
            {
                isVisible && 
                <ModalHotel onClose={handleOnClose}/>
            }
        </View>
    );
}

export default Hotel;