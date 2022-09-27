import React from "react";
import { View, Image, Text } from "react-native";
import { IconButton } from "@react-native-material/core";
import * as RootNavigation from '../utils/RootNavigation'
import Icon from 'react-native-vector-icons/Ionicons';
import ItemStyle from "./Styles";
import OptionsMenu from "react-native-option-menu";
import analytics from '@react-native-firebase/analytics';

const ItemEmpresaTuristica = ({item}) => {

    const handleNavigation = () => {
        RootNavigation.navigate('EmpresaTuristicaDetail', {firestoreId:item.firebaseId, imagen:item.imagen});
    };

    const handleEdit = () => {
        console.log('Editar')
    }

    const handleDelete = () => {
        console.log('Eliminar')
    }

    const handleFacebook = async () => {
        await analytics.logLogin({
            method:'call_facebook'
        });
    };

    const handleWhatsapp = async () => {
        await analytics.logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          });
    };

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
                    <IconButton  icon={<Icon name="heart-outline" size={25} color={'#E60023'} />}/>
                    <IconButton  icon={<Icon name="logo-whatsapp" size={25} color={'#25D366'} />} onPress={handleWhatsapp}/>
                    <IconButton  icon={<Icon name="logo-facebook" size={25} color={'#4267B2'} />} onPress={handleFacebook}/>
                </View>
            </View>
        </View>
    );
};

export default ItemEmpresaTuristica