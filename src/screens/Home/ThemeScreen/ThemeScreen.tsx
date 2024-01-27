import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

const ThemeScreen = ({ route }) => {
  const [rating, setRating] = useState("");

  const { theme } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>{theme}</Text>
      <Text style={styles.subtitle}>Dive into the Playo world of {theme} </Text>

      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
        Select rating
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
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
    </View>
  );
};

export default ThemeScreen;
