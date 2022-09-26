import { StyleSheet } from "react-native";

const FormStyle = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius: 5,
        paddingLeft:10,
        marginBottom: 10
    },
    labelInput:{
        fontWeight:'bold'
    },
    containerForm: {
        padding:15
    },
    messageError: {
        color: 'red',
        fontSize:10
    },
    containerImagen:{
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems:'flex-start'
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent:'space-between'
    }
});

export default FormStyle;
