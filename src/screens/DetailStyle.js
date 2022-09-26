import { StyleSheet } from "react-native";

const DetailStyle = StyleSheet.create({
    image: {
        width: '100%',
        height: '55%',
        resizeMode: 'cover',
        backgroundColor:'white'
      },
      title: {
        textAlign: 'center',
        fontWeight:'bold',
        margin:15,
        fontSize: 25,
        color: '#000'
      },
      detail: {
        color: '#000',
        fontSize: 15,
        paddingHorizontal: 10,
        borderRadius: 10
      },
      description: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,
        paddingHorizontal: 10,
        borderRadius: 10
      },
      container: {
        backgroundColor:'white',
        height: '45%'
      }
});

export default DetailStyle;