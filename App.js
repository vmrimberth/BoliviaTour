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
import { navigationRef } from './src/utils/RootNavigation';

import Icon from 'react-native-vector-icons/Ionicons';

//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {

  const Stack = createNativeStackNavigator();

  const LugarTuristicoStackScreen = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="LugarTuristicoScreen" component={LugarTuristico} options={{headerShown:false}}/>
          <Stack.Screen name="LugarTuristicoDetail" component={LugarTuristicoDetail} options={{title:'Detalle de lugar turistico'}}/>
          <Stack.Screen name="LugarTuristicoMap" component={LugarTuristicoMap} options={{title:'Ubicacion lugar turistico'}}/>
        </Stack.Navigator>
    );
  };

  const EmpresaTuristicaStackScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='EmpresaTuristicaScreen' component={EmpresaTuristica} options={{headerShown:false}}/>
        <Stack.Screen name='EmpresaTuristicaDetail' component={EmpresaTuristicaDetail} options={{title:'Detalle de empresa turistica'}}/>
      </Stack.Navigator>
    );
  };
  
  const HotelStackScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='HotelScreen' component={Hotel} options={{headerShown:false}}/>
        <Stack.Screen name='HotelDetail' component={HotelDetail} options={{title:'Detalle de hotel'}}/>
      </Stack.Navigator>
    );
  };

  const createScreenOptions = ({route}) =>{
    return{
      tabBarIcon: ({focused, size, color}) => {      
        let iconName = '';
        switch (route.name) {
          case "LugarTuristico":
            iconName = focused ? 'earth' : 'earth-outline';
            break;
          case "EmpresaTuristica":
            iconName = focused ? 'list-circle' : 'list-circle-outline';
            break;
          case 'Hotel':
            iconName = focused ? 'business' : 'business-outline';
            break;
        }
        return(<Icon name = { iconName } size = { size } color = { color } />)
      },
      headerShown:false
    };
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
      screenOptions={createScreenOptions}
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