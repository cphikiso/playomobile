import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";

const StoryScreen = ({ route, navigation }) => {
  const [sound, setSound] = useState();
  const { storySound } = route.params;

  console.log("story link", storySound);

  async function playSound(storySound) {
    try {
      console.log("Loading Sound");
      console.log("URLLLLLLL", storySound);
      const { sound } = await Audio.Sound.createAsync(
        { uri: storySound },
        {
          shouldPlay: true,
        }
      );

      console.log("Playing Sound");
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        paddingTop: 48,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View />
      <TouchableOpacity
        onPress={() => {
          playSound(storySound);
        }}
        style={{
          height: 44,
          width: 80,
          backgroundColor: "rgba(0,0,0,0.1)",
          marginHorizontal: 22,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Play</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          sound?.unloadAsync();
          navigation.navigate("Home");
        }}
        style={{
          height: 44,
          width: 80,
          backgroundColor: "rgba(0,0,0,0.1)",
          marginHorizontal: 22,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StoryScreen;
