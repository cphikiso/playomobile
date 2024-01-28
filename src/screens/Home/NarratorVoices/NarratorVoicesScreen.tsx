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
import { styles } from "./styles";

const NarratorVoicesScreen = ({ route, navigation }) => {
  const [voices, setVoices] = useState();
  const [sound, setSound] = useState();

  const [chosenVoice, setChosenVoice] = useState();

  const options = { method: "GET" };

  const { storyId } = route.params;

  console.log("param", storyId);

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

  async function createVoice({ voice_id, document_id }) {
    try {
      const response = await fetch(
        "https://generate-narration-omsnazusfa-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1ZTU1MTA3NDY2YjdlMjk4MzYxOTljNThjNzU4MWY1YjkyM2JlNDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1ODAzNjg2MjExMDIyNzUzMjg2IiwiZW1haWwiOiI5N21pY2hlbGFuZ2Vsb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im5NYmxGYTFGSTNEYnFlOUx0WFREWXciLCJuYmYiOjE3MDY0MDg4MDQsImlhdCI6MTcwNjQwOTEwNCwiZXhwIjoxNzA2NDEyNzA0LCJqdGkiOiJkMzY1ZjEyODc0MzE2Mzc5NDIxM2ViYzA5ZjFjMTQ4MzRiNGI2ZjEyIn0.39IDE1PCvH_YbMa04CloOMZ-QLPb78d-jai-7f3QFCDfmPbLNIhHRVzAU-qCHg_tReaBA3dhuMLsCeTwFTrmDXPf4yHmx2y6G_jCA_5au3tYi72NOAjengICW3HJI2JZO8wz1eM5Ct_suCJhQlMKvujpm0BDJ6iORzwMR33D_68Ehxhicd6ES5XpJFFk7Y0LcsKHPTXumhC_B0KsFuQIGADyjRMQuknkzxldoDA33hDK6_fBiyUKGP52slQX_69ibxPYN5oa3gD9IbwTjqk0777lmf22m0qGpy18_aOKIvGNHsX63OQdYKXo57baTzT7FpdHetv1zCO_0Nbjh9RXkQ",
          },
          body: JSON.stringify({ voice_id, document_id }),
        }
      );

      if (response.ok) {
        const data = await response.text(); // Get the response as a string

        if (data) {
          console.log("Data returned", data);
          console.log("data", data);
          return navigation.navigate("StoryScreen", { storySound: data });
        } else {
          Alert.alert("Error telling the story");
        }
      } else {
        // Handle non-OK responses, e.g., response.status 415 (Unsupported Media Type)
        console.log("Response not OK:", response);
      }
    } catch (error) {
      Alert.alert(error.message);
      console.warn(error);
    }
  }

  return (
    <SafeAreaView style={{ paddingTop: 48, flex: 1 }}>
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
                setChosenVoice(voice?.item?.name);
              }}
              style={[
                {
                  height: 44,
                  width: 80,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  marginHorizontal: 22,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                },
                voice?.item?.name == chosenVoice && {
                  borderWidth: 4,
                  borderColor: "#000",
                },
              ]}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {voice.item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("press");
          chosenVoice
            ? createVoice({
                voice_id: chosenVoice,
                document_id: storyId,
              })
            : Alert.alert("Please select a voice");
        }}
        style={styles.continueButton}
      >
        <Text style={styles.continueText}>Continue with: {chosenVoice}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NarratorVoicesScreen;
