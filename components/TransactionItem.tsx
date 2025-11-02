import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Transaction } from "../types/Transaction";

type Props = {
  transaction: Transaction;
};

export default function TransactionItem({ transaction }: Props) {
  const formattedAmount = `R$ ${transaction.amount.toFixed(2)}`;
  const sign = transaction.type === "income" ? "+" : "-";
  const amountColor = transaction.type === "income" ? "green" : "red";

  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.meta}>
          {transaction.category} •{" "}
          {new Date(transaction.date).toLocaleDateString()}
        </Text>
      </View>

      <Text style={[styles.amount, { color: amountColor }]}>
        {sign} {formattedAmount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  left: { flex: 1, paddingRight: 10 },
  title: { fontSize: 16, fontWeight: "600" },
  meta: { fontSize: 12, color: "#666", marginTop: 4 },
  amount: { fontSize: 16, fontWeight: "700" },
});
