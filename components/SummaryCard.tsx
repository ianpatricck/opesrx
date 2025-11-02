import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Summary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

type Props = {
  summary: Summary;
};

export default function SummaryCard({ summary }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Entradas:</Text>
        <Text style={styles.income}>R$ {summary.totalIncome.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Saídas:</Text>
        <Text style={styles.expense}>R$ {summary.totalExpense.toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Saldo:</Text>
        <Text
          style={[
            styles.balance,
            { color: summary.balance >= 0 ? "green" : "red" },
          ]}
        >
          R$ {summary.balance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: { fontSize: 16, color: "#555" },
  income: { fontSize: 18, color: "green", fontWeight: "bold" },
  expense: { fontSize: 18, color: "red", fontWeight: "bold" },
  balance: { fontSize: 20, fontWeight: "bold" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 8 },
});
