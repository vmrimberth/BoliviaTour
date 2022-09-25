import React from "react";
import { View, Image, Text } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../utils/RootNavigation'
import ItemStyle from "./Styles";
import OptionsMenu from "react-native-option-menu";

const ItemHotel = ({item}) => {

    const handleNavigation = () => {
        RootNavigation.navigate('HotelDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    }

    const handleEdit = () => {
        console.log('Editar')
    }

    const handleDelete = () => {
        console.log('Eliminar')
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
                            options={["Modificar", "Eliminar"]}
                            actions={[handleEdit, handleDelete]}/>
                    </View>
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