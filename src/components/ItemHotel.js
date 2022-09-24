import React from "react";
import { View, Image, Text } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../utils/RootNavigation'
import ItemStyle from "./Styles";

const ItemHotel = ({item}) => {

    const handleNavigation = () => {
        RootNavigation.navigate('HotelDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    }

    return(
        <View style={ItemStyle.container}>
            <View style={ItemStyle.img}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </View>
            <View style={ItemStyle.left}>
                <View>
                    <Text style={ItemStyle.txtName}>{item.nombre}</Text>
                    <Text style={ItemStyle.txtDesc}>{item.direccion}</Text>
                </View>
                <View style={ItemStyle.button}>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="information-circle-outline" {...props} />} onPress={handleNavigation}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="heart-outline" {...props} />}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="logo-whatsapp" {...props} />}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="logo-facebook" {...props} />}/>
                </View>
            </View>
        </View>
    );
};

export default ItemHotel