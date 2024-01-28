import { StyleSheet } from "react-native";
import { COLORS } from "../../../../components/LoadingIndicator";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 28,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#AEAEB2",
  },
  ratingView: {
    width: 80,
    backgroundColor: "#D1D1D6",
    justifyContent: "center",
    alignItems: "center",
    height: 52,
    borderRadius: 12,
    borderCurve: "continuous",
  },
  ratingText: { fontSize: 18, color: "#fff", fontWeight: "700" },
  textinput: {
    backgroundColor: "#F2F2F7",
    height: 48,
    borderRadius: 12,
    borderCurve: "continuous",
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  createButton: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderCurve: "continuous",
    marginHorizontal: 16,
  },
  txt: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkBlue,
  },
});
