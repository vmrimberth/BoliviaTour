import React from "react";
import { View, Image, Text, Linking } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../utils/RootNavigation'
import ItemStyle from "./Styles";
import OptionsMenu from "react-native-option-menu";
import firestore from '@react-native-firebase/firestore';

const ItemHotel = ({item}) => {

    const handleNavigation = () => {
        RootNavigation.navigate('HotelDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    }

    const handleEdit = () => {
        console.log('Editar')
    }

    const handleDelete = async () => {
        const deleteHotel = await firestore()
        .collection('hotel')
        .doc(item.firebaseId)
        .delete()
        .then( data => { alert("Hotel Eliminado") })
        .catch(e => { console.log(e) });
    }

    const handleLike = () => {
        var likeCount = 0;
        firestore()
        .collection('hotel')
        .doc(item.firebaseId)
        .get()
        .then(querySnapshot => {
            likeCount = querySnapshot.data().like+1
            firestore()
            .collection('hotel')
            .doc(item.firebaseId)
            .update({
                like: likeCount
            })
            .then(() => {
                console.log('Hotel updated!');
            });
        })
        .catch(e => {console.log(e)});
    }

    const handelWhatsapp = async () => {
        await Linking.openURL('https://wa.me/+59173838529?text=Mas informacion por favor');
    }

    const handelFacebook = async () => {
        await Linking.openURL('fb://page/PAGE_ID');
    }

    const myIcon = (<Icon name="ellipsis-vertical" size={30} color="#000" />)

    return(
        <View style={ItemStyle.container}>
            <View style={ItemStyle.img}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </View>
            <View style={ItemStyle.left}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={ItemStyle.txtName}>{item.nombre}</Text>
                        <Text style={ItemStyle.txtDesc}>{item.direccion}</Text>
                    </View>
                    <View style={{flex:0}}>
                        <OptionsMenu
                            customButton={myIcon}
                            destructiveIndex={1}
                            options={["Modificar", "Eliminar", "Cancelar"]}
                            actions={[handleEdit, handleDelete]}/>
                    </View>
                </View>
                <View style={ItemStyle.button}>
                    <IconButton  icon={<Icon name="information-circle-outline" size={25} color={'#006AFF'} />} onPress={handleNavigation}/>
                    <IconButton  icon={<Icon name="heart-outline" size={25} color={'#E60023'} />} onPress={handleLike}/>
                    <IconButton  icon={<Icon name="logo-whatsapp" size={25} color={'#25D366'} />} onPress={handelWhatsapp}/>
                    <IconButton  icon={<Icon name="logo-facebook" size={25} color={'#4267B2'} />} onPress={handelFacebook}/>
                </View>
            </View>
        </View>
    );
};

export default ItemHotel