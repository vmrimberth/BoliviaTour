import React from "react";
import { Text, View, Image } from "react-native";
import * as RootNavigation from '../utils/RootNavigation'
import { IconButton } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import ItemStyle from "./Styles";

const ItemLugarTuristico = ({item}) => {
    //console.log("item: ", item)
    const handleNavigation = () => {
        RootNavigation.navigate('LugarTuristicoDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    };

    const handleNavigationUbicacion = () => {
        //console.log("item: ", item)
        RootNavigation.navigate('LugarTuristicoMap', {ubicacion:item.ubicacion});
    };

    return (
        <View style={ItemStyle.container} >
            <View style={ItemStyle.img}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </View>
            
            <View style={ItemStyle.left}>
                <View>
                    <Text style={ItemStyle.txtName}>{item.nombre}</Text>
                    <Text style={ItemStyle.txtDesc}>{item.departamento}</Text>
                </View>
                <View style={ItemStyle.button}>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="information-circle-outline" {...props} />} onPress={handleNavigation}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="location-outline" {...props} />} onPress={handleNavigationUbicacion}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="heart-outline" {...props} />}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="images-outline" {...props} />}/>
                </View>
            </View>
        </View>
    );
};

export default ItemLugarTuristico;