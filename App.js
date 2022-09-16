import React, { useEffect } from "react";
import { SafeAreaView} from "react-native";


import LugarTuristico from "./src/screens/LugarTuristico";

const App = () => {

  return (
    
    <SafeAreaView style={{flex: 1}}>
      <LugarTuristico/>
    </SafeAreaView>
  );
};

export default App;