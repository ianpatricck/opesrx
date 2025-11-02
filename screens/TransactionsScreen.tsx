import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllTransactions } from "../database/transactions";
import { Transaction } from "../types/Transaction";

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadTransactions = async () => {
        const data = await getAllTransactions();
        setTransactions(data);
      };

      loadTransactions();
    }, []),
  );

  const renderItem = ({ item }: { item: Transaction }) => {
    const formattedAmount = `R$ ${item.amount.toFixed(2)}`;
    const sign = item.type == "income" ? "+" : "-";
    const amountColor = item.type == "income" ? "green" : "red";

    return (
      <View style={styles.item}>
        <View style={styles.left}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.category} • {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>

        <Text style={[styles.amount, { color: amountColor }]}>
          {sign} {formattedAmount}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma transação encontrada.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  left: { flex: 1, paddingRight: 10 },
  title: { fontSize: 16, fontWeight: "600" },
  meta: { fontSize: 12, color: "#666", marginTop: 4 },
  amount: { fontSize: 16, fontWeight: "bold" },
  empty: { textAlign: "center", color: "#666", marginTop: 40 },
});
