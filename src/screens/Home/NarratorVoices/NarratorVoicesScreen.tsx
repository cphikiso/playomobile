import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";

const NarratorVoicesScreen = () => {
  const [voices, setVoices] = useState();
  const [sound, setSound] = useState();

  const options = { method: "GET" };

  useEffect(() => {
    fetch("https://api.elevenlabs.io/v1/voices", options)
      .then((response) => response.json())
      .then((response) => {
        setVoices(response.voices);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);

  async function playSound(previewUrl) {
    try {
      console.log("Loading Sound");
      console.log("URLLLLLLL", previewUrl);
      const { sound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        {
          shouldPlay: true,
        }
      );
      setSound(sound);

      console.log("Playing Sound");
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
    <SafeAreaView style={{ alignItems: "center", paddingTop: 48, flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={voices}
        columnWrapperStyle={{ margin: 10 }}
        renderItem={(voice) => {
          return (
            <TouchableOpacity
              onPress={() => playSound(voice.item.preview_url)}
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
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {voice.item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NarratorVoicesScreen;
