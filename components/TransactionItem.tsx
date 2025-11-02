import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Transaction } from "../types/Transaction";
import { deleteTransaction } from "../database/transactions";

type Props = {
  transaction: Transaction;
  onDeleted?: () => void;
};

export default function TransactionItem({ transaction, onDeleted }: Props) {
  const formattedAmount = `R$ ${transaction.amount.toFixed(2)}`;
  const sign = transaction.type === "income" ? "+" : "-";
  const amountColor = transaction.type === "income" ? "green" : "red";

  const handleDelete = () => {
    Alert.alert(
      "Excluir Transação",
      `Tem certeza que deseja excluir "${transaction.title}"`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(transaction.id!);
            onDeleted?.();
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity onLongPress={handleDelete}>
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
    </TouchableOpacity>
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
