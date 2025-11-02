import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getSummary } from "../database/transactions";
import { Ionicons } from "@expo/vector-icons";

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
      <View style={styles.card}>
        <Text style={styles.label}>Entradas:</Text>
        <Text style={styles.valueIncome}>
          R${summary.totalIncome.toFixed(2)}
        </Text>

        <Text style={styles.label}>Saidas:</Text>
        <Text style={styles.valueExpense}>
          R${summary.totalExpense.toFixed(2)}
        </Text>

        <Text style={styles.label}>Saldo:</Text>
        <Text
          style={[
            styles.valueBalance,
            { color: summary.balance >= 0 ? "green" : "red" },
          ]}
        >
          R${summary.balance.toFixed(2)}
        </Text>
      </View>

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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  label: { fontSize: 16, color: "#555", marginTop: 8 },
  valueIncome: { fontSize: 18, color: "green", fontWeight: "bold" },
  valueExpense: { fontSize: 18, color: "red", fontWeight: "bold" },
  valueBalance: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
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
