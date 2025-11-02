import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getSummary } from "../database/transactions";
import { Ionicons } from "@expo/vector-icons";
import SummaryCard from "../components/SummaryCard";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const loadSummary = async () => {
        const data = await getSummary();
        setSummary(data);
      };

      loadSummary();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo financeiro</Text>
      <SummaryCard summary={summary}></SummaryCard>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTransaction")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
