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

const StoryScreen = ({ route }) => {
  const [sound, setSound] = useState();
  const { storySound } = route.params();

  console.log("story link", storySound);

  // async function playSound(previewUrl) {
  //   try {
  //     console.log("Loading Sound");
  //     console.log("URLLLLLLL", previewUrl);
  //     const { sound } = await Audio.Sound.createAsync(
  //       { uri: previewUrl },
  //       {
  //         shouldPlay: true,
  //       }
  //     );
  //     setSound(sound);

  //     console.log("Playing Sound");
  //     await sound.playAsync();
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

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
              onPress={() => {
                playSound(voice?.item?.preview_url);
                console.log("voice", voice?.item?.voice_id);
                createVoice({
                  voice_id: voice?.item?.voice_id,
                  document_id: storyId,
                });
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

export default StoryScreen;
