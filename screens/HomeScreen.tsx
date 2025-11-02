// src/screens/HomeScreen.tsx
import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAllTransactions } from "../database/transactions";
import { Transaction } from "../types/Transaction";
import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  const loadTransactions = async () => {
    const data = await getAllTransactions();
    setTransactions(data);
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;
  const summary = { totalIncome: income, totalExpense: expense, balance };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OpesRX</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <SummaryCard summary={summary} />
            <IncomeExpenseChart
              income={income}
              expense={expense}
              balance={balance}
            />
          </>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("AddTransaction")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#999" },
  scrollContainer: {
    paddingBottom: 120,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    borderRadius: 14,
    padding: 10,
    backgroundColor: "#4CAF50",
  },
});
