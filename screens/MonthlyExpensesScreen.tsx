import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { getAllTransactions } from "../database/transactions";
import { Transaction } from "../types/Transaction";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

type MonthlyData = {
  month: string;
  income: number;
  expense: number;
};

function getLastNMonths(n: number): string[] {
  const months: string[] = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthStr = `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    months.push(monthStr);
  }

  return months;
}

export default function MonthlyExpensesScreen() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  const loadMonthlyData = async () => {
    const transactions: Transaction[] = await getAllTransactions();

    const monthlyMap: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);
      if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 };
      if (t.type === "income") monthlyMap[month].income += t.amount;
      else if (t.type === "expense") monthlyMap[month].expense += t.amount;
    });

    const allMonths = getLastNMonths(4);

    const monthlyArray = allMonths.map((month) => ({
      month,
      income: monthlyMap[month]?.income || 0,
      expense: monthlyMap[month]?.expense || 0,
    }));

    setMonthlyData(monthlyArray);
  };

  useFocusEffect(
    useCallback(() => {
      loadMonthlyData();
    }, []),
  );

  const chartData = monthlyData.flatMap((item) => [
    {
      value: item.income,
      label: item.month.split("-")[1],
      frontColor: item.income > 0 ? "#4CAF50" : "#ccc",
    },
    {
      value: item.expense,
      label: "",
      frontColor: item.expense > 0 ? "#E53935" : "#ccc",
    },
  ]);

  const maxValue = Math.max(
    ...monthlyData.flatMap((item) => [item.income, item.expense]),
    10,
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ganhos e Gastos Mensais</Text>
      {chartData.length > 0 ? (
        <BarChart
          data={chartData}
          barWidth={20}
          spacing={16}
          initialSpacing={10}
          roundedTop
          showLine={true}
          height={300}
          isAnimated={true}
          maxValue={maxValue}
          yAxisThickness={1}
          yAxisLabelSuffix=""
        />
      ) : (
        <Text style={styles.noDataText}>Nenhuma despesa registrada.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9FAFB",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    marginTop: 50,
  },
});
