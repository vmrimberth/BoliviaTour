import { StyleSheet } from "react-native";

const ItemStyle = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding:10,
        backgroundColor:'white',
        margin:10,
        elevation:5,
        borderRadius:5
    },
    txtName:{
        fontSize:16,
        fontWeight:'bold',
        color:'#000'
    },
    txtDesc:{
        fontSize:12,
        fontWeight:'bold',
        color:'#00009'
    },
    img:{
        width:'30%'
    },
    left:{
        justifyContent:'space-between',
        flexDirection: 'column',
        width:'70%'
    },
    button:{
        flexDirection: 'row',
        justifyContent:'flex-end'
    }
});

export default ItemStyle;