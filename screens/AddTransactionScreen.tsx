import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function AddTransactionScreen() {
  return (
    <View style={styles.container}>
      <Text>Nova transação</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
