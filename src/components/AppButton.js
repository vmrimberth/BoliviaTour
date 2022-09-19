import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Button, TouchableOpacity, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const AppButton = () => ({ onPress, title }) => {

    TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

    return(
    <TouchableOpacity onPress={onPress}>
        <LinearGradient
        colors={["#004d40", "#009688"]}
        style={styles.appButtonContainer}
        >
        <Text style={styles.appButtonText}>{title}</Text>
        </LinearGradient>
    </TouchableOpacity>
  );
}

  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16
    },
    appButtonContainer: {
      elevation: 8,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });

export default AppButton