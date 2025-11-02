import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllTransactions } from "../database/transactions";
import { Transaction } from "../types/Transaction";
import TransactionItem from "../components/TransactionItem";

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onDeleted={() => {
              setTransactions((prev) => prev.filter((t) => t.id !== item.id));
            }}
          />
        )}
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
  empty: { textAlign: "center", color: "#666", marginTop: 40 },
});
