import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 28,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 28,
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: "500",
    //textAlign: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "500", marginBottom: 10 },
  ratingView: {
    width: 80,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    height: 52,
    borderRadius: 12,
    borderCurve: "continuous",
  },
  ratingText: { fontSize: 18, color: "#fff", fontWeight: "700" },
});
