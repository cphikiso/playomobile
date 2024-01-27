import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";

const ThemeScreen = ({ route }) => {
  const [rating, setRating] = useState("");

  const { theme } = route.params;

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

        {/* word * count */}
        <Text style={styles.sectionTitle}>Word Count</Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={6}
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            height: 48,
            borderRadius: 12,
            borderCurve: "continuous",
            paddingHorizontal: 16,
            fontSize: 16,
            fontWeight: "500",
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 16,
          borderRadius: 16,
          borderCurve: "continuous",
          marginHorizontal: 16,
        }}
      >
        <Text style={styles.ratingText}>Create Story</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ThemeScreen;
