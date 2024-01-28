import React from "react";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "./LoadingIndicator";
import { LoadingIndicator } from "./LoadingIndicator";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
        backgroundColor: "#000",
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
