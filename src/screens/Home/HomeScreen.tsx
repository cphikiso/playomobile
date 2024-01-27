import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { StoryThemes } from "../../../assets/data";
import ThemeTile from "../../../components/ThemeTile";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={StoryThemes}
        renderItem={(theme) => {
          return <ThemeTile title={theme.item} />;
        }}
      />
    </View>
  );
};

export default HomeScreen;
