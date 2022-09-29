import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LugarTuristico from "./src/screens/LugarTuristico";
import LugarTuristicoDetail from './src/screens/LugarTuristicoDetail';
import EmpresaTuristica from "./src/screens/EmpresaTuristica";
import EmpresaTuristicaDetail from "./src/screens/EmpresaTuristicaDetail"
import Hotel from './src/screens/Hotel';
import HotelDetail from './src/screens/HotelDetail'
import LugarTuristicoMap from './src/screens/LugarTuristicoMap';
import LugarTuristicoPhotos from './src/screens/LugarTuristicoPhotos';
import { navigationRef } from './src/utils/RootNavigation';

import Icon from 'react-native-vector-icons/Ionicons';

//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {

  const Stack = createNativeStackNavigator();

  const LugarTuristicoStackScreen = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="LugarTuristicoScreen" component={LugarTuristico} options={{
            title: 'Lugar Turistico',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}/>
          <Stack.Screen name="LugarTuristicoDetail" component={LugarTuristicoDetail} options={{
            title:'Detalle de lugar turistico',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}/>
          <Stack.Screen name="LugarTuristicoMap" component={LugarTuristicoMap} options={{
            title:'Ubicacion lugar turistico',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}/>
          <Stack.Screen name="LugarTuristicoPhotos" component={LugarTuristicoPhotos} options={{
            title:'Galeria de imagenes',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}/>
        </Stack.Navigator>
    );
  };

  const EmpresaTuristicaStackScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='EmpresaTuristicaScreen' component={EmpresaTuristica} options={{
          title:'Empresa Turistica',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
        <Stack.Screen name='EmpresaTuristicaDetail' component={EmpresaTuristicaDetail} options={{
          title:'Detalle de empresa turistica',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      </Stack.Navigator>
    );
  };
  
  const HotelStackScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='HotelScreen' component={Hotel} options={{
          title: 'Hotel',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
        <Stack.Screen name='HotelDetail' component={HotelDetail} options={{
          title:'Detalle de hotel',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      </Stack.Navigator>
    );
  };

  const createScreenOptions = ({route}) =>{
    return{
      tabBarIcon: ({focused, color}) => {      
        
        let iconName = '';
        let iconSize = 20;
        switch (route.name) {
          case "LugarTuristico":
            iconName = focused ? 'earth' : 'earth-outline';
            iconSize = focused ? 23 : 20;
            break;
          case "EmpresaTuristica":
            iconName = focused ? 'list-circle' : 'list-circle-outline';
            iconSize = focused ? 23 : 20;
            break;
          case 'Hotel':
            iconName = focused ? 'business' : 'business-outline';
            iconSize = focused ? 23 : 20;
            break;
        }
        return(<Icon name = { iconName } size = { iconSize } color = { color } />)
      }
    };
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
      screenOptions={createScreenOptions}
      initialRouteName="LugarTuristico"
      activeColor="#f0edf6"
      inactiveColor="#ecf0f1"
      barStyle={{ backgroundColor: '#f4511e' }}
      >
        <Tab.Screen name="LugarTuristico" component={LugarTuristicoStackScreen} />
        <Tab.Screen name="EmpresaTuristica" component={EmpresaTuristicaStackScreen} />
        <Tab.Screen name="Hotel" component={HotelStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: 'flex-start',
    marginTop: 50
  },
  list: {
    width: '100%'
  },
  cards: {
    padding: 20
  },
  description: {
    backgroundColor: '#444',
    color: 'white',
    padding: 10,
    fontWeight: "bold"
  },
  image: {
    width: '100%',
    height: 150
  }
});

export default App;