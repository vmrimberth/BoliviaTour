import React from "react";
import {View, StyleSheet} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const LugarTuristicoMap = ({navigation, route}) => {

    const { ubicacion } = route.params

    return (
        <View style={styles.container}>
          <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: ubicacion.latitude,
              longitude: ubicacion.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker coordinate={{
              latitude: ubicacion.latitude,
              longitude: ubicacion.longitude
            }} />
            
            <Circle
              center={{
                latitude: ubicacion.latitude,
                longitude: ubicacion.longitude
              }}
              radius={50}
              fillColor="rgba(0,0,0,0.3)"
            />
    
          </MapView>
        </View>
      )
};

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      flex:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    }
  })

export default LugarTuristicoMap;