import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

const ThemeScreen = ({ route, navigation }) => {
  const { theme } = route.params;

  const [rating, setRating] = useState("");
  const [wordCount, setWordCount] = useState("100");
  const [storyline, setStoryline] = useState(theme);
  const [storyData, setStoryData] = useState();

  async function generateStory({ text, theme, age_rating, word_count }) {
    try {
      const response = await fetch(
        "https://generate-story-omsnazusfa-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, theme, age_rating, word_count }),
        }
      );

      if (response.ok) {
        const data = await response.text(); // Get the response as a string

        if (data) {
          console.log("Data returned", data);
          setStoryData(JSON.parse(data));
        } else {
          Alert.alert("Error telling the story");
        }
      } else {
        // Handle non-OK responses, e.g., response.status 415 (Unsupported Media Type)
        console.log("Response not OK:", response.statusText);
      }
    } catch (error) {
      Alert.alert(error.message);
      console.warn(error);
    }
  }

  console.log("data", storyData?.document_id);

  useEffect(() => {
    if (storyData?.document_id) {
      return navigation.navigate("NarratorVoices", {
        storyId: storyData?.document_id,
      });
    }
  }, [storyData]);

  return (
    <SafeAreaView
      style={[styles.container, { justifyContent: "space-between" }]}
    >
      <StatusBar style="auto" />
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text style={styles.title}>{theme}</Text>
        <Text style={styles.subtitle}>
          Dive into the Playo world of {theme}{" "}
        </Text>

        <Text style={styles.sectionTitle}>Select rating</Text>
        {/* age * rating */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 28,
          }}
        >
          <TouchableOpacity
            onPress={() => setRating("adult")}
            style={[
              styles.ratingView,
              { backgroundColor: "black" },
              rating == "adult" && { borderWidth: 4, borderColor: "grey" },
            ]}
          >
            <Text style={styles.ratingText}>Adult</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRating("teen")}
            style={[
              styles.ratingView,
              { backgroundColor: "orange" },
              rating == "teen" && { borderWidth: 4, borderColor: "grey" },
            ]}
          >
            <Text style={styles.ratingText}>Teen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRating("child")}
            style={[
              styles.ratingView,
              { backgroundColor: "green" },
              rating == "child" && { borderWidth: 4, borderColor: "grey" },
            ]}
          >
            <Text style={styles.ratingText}>Child</Text>
          </TouchableOpacity>
        </View>

        {/* story line  */}
        <Text style={styles.sectionTitle}>Story line</Text>
        <TextInput
          multiline
          maxLength={300}
          style={[
            styles.textinput,
            { marginBottom: 16, height: 200, paddingTop: 12 },
          ]}
          onChangeText={(count) => setWordCount(count)}
        />

        {/* word * count */}
        <Text style={styles.sectionTitle}>Word Count</Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={6}
          style={styles.textinput}
          onChangeText={(count) => setWordCount(count)}
        />
        {/* <Text>{}</Text> */}
      </View>
      <TouchableOpacity
        onPress={() => {
          generateStory({
            text: storyline,
            theme: theme,
            age_rating: rating,
            word_count: wordCount,
          });
          // navigation.navigate("NarratorVoices");
        }}
        style={styles.createButton}
      >
        <Text style={styles.ratingText}>Create Story</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ThemeScreen;
