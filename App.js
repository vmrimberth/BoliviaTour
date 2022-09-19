import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View} from "react-native";

import { NavigationContainer } from '@react-navigation/native';

import LugarTuristico from "./src/screens/LugarTuristico";
import EmpresaTuristica from "./src/screens/EmpresaTuristica";

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {

  const LugarTuristicoScreen = () => {
    return (
      <View style={styles.container}>
        
        <SafeAreaView style={{flex: 1}}>
          <LugarTuristico/>
        </SafeAreaView>
      </View>
    );
  };

  const EmpresaTuristicaScreen = () => {
    return (
      <View style={styles.container}>
        
        <SafeAreaView style={{flex: 1}}>
          <EmpresaTuristica/>
        </SafeAreaView>
      </View>
    );
  };
  
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, size, color}) => {
          let iconName = '';
          switch (route.name) {
            case "LugarTuristico":
              iconName = focused ? 'home' : 'home-outline';
              break;
            case "EmpresaTuristica":
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            case 'Hotel':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
          }
          return <Icon name = { iconName } size = { size } color = { color } />
        }
      })}
      >
        <Tab.Screen name="LugarTuristico" component={LugarTuristicoScreen} />
        <Tab.Screen name="EmpresaTuristica" component={EmpresaTuristicaScreen} />
        <Tab.Screen name="Hotel" component={LugarTuristicoScreen} />
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