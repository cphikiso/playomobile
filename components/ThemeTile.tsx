import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const ThemeTile = ({ title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ThemeConfirm", { theme: title });
      }}
      style={{
        height: 100,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        borderCurve: "continuous",
        marginBottom: 16,
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 28, color: "#fff" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeTile;
