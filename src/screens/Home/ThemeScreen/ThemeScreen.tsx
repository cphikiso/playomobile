import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

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

import { COLORS } from "../../../../components";
import { LoadingIndicator } from "../../../../components";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/* 
loading states = null,loading, complete
*/

const ThemeScreen = ({ route, navigation }) => {
  const { theme } = route.params;

  const [rating, setRating] = useState("");
  const [wordCount, setWordCount] = useState();
  const [storyline, setStoryline] = useState();
  const [storyData, setStoryData] = useState();
  const [loading, setLoading] = useState("null");

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
          setLoading("complete");
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

  function dismissKeyboard() {
    Keyboard.dismiss();
  }

  const rLoading = useSharedValue("null");

  useEffect(() => {
    rLoading.value = loading;
  }, [loading]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      marginHorizontal: 16,
      backgroundColor: withTiming(
        rLoading.value == "null" || rLoading.value == "loading"
          ? COLORS.lightBlue
          : COLORS.lightGreen
      ),
    };
  }, []);

  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(
        rLoading.value == "null" || rLoading.value == "loading"
          ? COLORS.darkBlue
          : COLORS.green
      ),
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
      <SafeAreaView
        style={[styles.container, { justifyContent: "space-between" }]}
      >
        <StatusBar style="auto" />
        <View style={{ paddingHorizontal: 16 }}>
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

                rating == "adult" && { backgroundColor: "#000" },
              ]}
            >
              <Text style={styles.ratingText}>Adult</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRating("teen")}
              style={[
                styles.ratingView,

                rating == "teen" && { backgroundColor: "#000" },
              ]}
            >
              <Text style={styles.ratingText}>Teen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRating("child")}
              style={[
                styles.ratingView,

                rating == "child" && { backgroundColor: "#000" },
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
            onChangeText={(story) => setStoryline(story)}
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
        {/* <TouchableOpacity
          onPress={() => {
            storyline && rating && wordCount
              ? generateStory({
                  text: storyline,
                  theme: theme,
                  age_rating: rating,
                  word_count: wordCount,
                })
              : Alert.alert("Please fill in all fields");
         
          }}
          style={styles.createButton}
        >
          <Text style={styles.ratingText}>Create Story</Text>
        </TouchableOpacity> */}

        <AnimatedPressable
          onPress={() => {
            console.log("loading", loading);
            storyline && rating && wordCount
              ? (setLoading("loading"),
                generateStory({
                  text: storyline,
                  theme: theme,
                  age_rating: rating,
                  word_count: wordCount,
                }))
              : Alert.alert("Please fill in all fields");
          }}
          layout={Layout.springify().damping(14)}
          style={[
            {
              padding: 16,
              borderRadius: 100,
              flexDirection: "row",
              justifyContent: "center",
            },
            containerStyle,
          ]}
        >
          {loading == "null" ? null : (
            <Animated.View style={{ marginRight: 8 }} entering={FadeIn}>
              <LoadingIndicator enabled={loading} />
            </Animated.View>
          )}
          {loading == "loading" ? (
            <Animated.Text
              style={[styles.txt, textStyle]}
              entering={FadeInLeft.delay(150).duration(150)}
              exiting={FadeOutLeft.duration(100)}
            >
              Creating Story
            </Animated.Text>
          ) : loading == "null" ? (
            <Animated.Text
              style={[styles.txt, textStyle]}
              entering={FadeInLeft.delay(150).duration(150)}
              exiting={FadeOutLeft.duration(100)}
            >
              Create Story
            </Animated.Text>
          ) : null}

          {loading == "complete" ? (
            <Animated.Text
              style={[styles.txt, textStyle]}
              entering={FadeInRight.delay(150).duration(150)}
              exiting={FadeOutRight.duration(100)}
            >
              Story Created
            </Animated.Text>
          ) : null}
        </AnimatedPressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ThemeScreen;
