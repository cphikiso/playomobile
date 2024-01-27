import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ThemeTile = () => {
  return (
    <TouchableOpacity
      style={{
        height: 100,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        borderCurve: "continuous",
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 28, color: "#fff" }}>
        Theme
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeTile;
