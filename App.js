import React, { useEffect } from "react";
import { SafeAreaView} from "react-native";


import LugarTuristico from "./src/screens/LugarTuristico";
import EmpresaTuristica from "./src/screens/EmpresaTuristica";

const App = () => {

  
  return (
    <SafeAreaView style={{flex: 1}}>
      <EmpresaTuristica/>
    </SafeAreaView>
  );
};

export default App;