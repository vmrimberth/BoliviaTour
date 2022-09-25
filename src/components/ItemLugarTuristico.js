import React from "react";
import { Text, View, Image } from "react-native";
import { IconButton } from "@react-native-material/core";
import * as RootNavigation from '../utils/RootNavigation'
import Icon from 'react-native-vector-icons/Ionicons';
import ItemStyle from "./Styles";
import OptionsMenu from "react-native-option-menu";


const ItemLugarTuristico = ({item}) => {
    //console.log("item: ", item)
    const handleNavigation = () => {
        RootNavigation.navigate('LugarTuristicoDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    };

    const handleNavigationUbicacion = () => {
        //console.log("item: ", item)
        RootNavigation.navigate('LugarTuristicoMap', {ubicacion:item.ubicacion});
    };

    const handleEdit = () => {
        console.log('Editar')
    }

    const handleDelete = () => {
        console.log('Eliminar')
    }

    const myIcon = (<Icon name="ellipsis-vertical" size={30} color="#000" />)

    return (
        <View style={ItemStyle.container} >
            <View style={ItemStyle.img}>
                <Image source={{uri:item.imagen}} style={{width:100, height:100}}></Image>
            </View>
            
            <View style={ItemStyle.left}>
                <View  style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={ItemStyle.txtName}>{item.nombre}</Text>
                        <Text style={ItemStyle.txtDesc}>{item.departamento}</Text>
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
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="location-outline" {...props} />} onPress={handleNavigationUbicacion}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="heart-outline" {...props} />}/>
                    <IconButton  variant='solid' colorScheme="indigo" icon={props => <Icon name="images-outline" {...props} />}/>
                </View>
            </View>
        </View>
    );
};

export default ItemLugarTuristico;