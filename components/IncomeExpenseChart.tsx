import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TouchableOpacity } from "react-native";

type Props = {
  income: number;
  expense: number;
  balance: number;
};

export default function IncomeExpenseChart({
  income,
  expense,
  balance,
}: Props) {
  const [activeSlice, setActiveSlice] = useState<"income" | "expense" | null>(
    null,
  );

  const total = income + expense;
  const incomePercentage = total ? ((income / total) * 100).toFixed(1) : "0";
  const expensePercentage = total ? ((expense / total) * 100).toFixed(1) : "0";

  const data = [
    {
      value: income,
      color: "#4CAF50",
      gradientCenterColor: "#81C784",
      focused: activeSlice === "income",
      onPress: () => setActiveSlice("income"),
    },
    {
      value: expense,
      color: "#E53935",
      gradientCenterColor: "#EF5350",
      focused: activeSlice === "expense",
      onPress: () => setActiveSlice("expense"),
    },
  ];

  const renderCenter = () => {
    if (activeSlice === "income") {
      return (
        <View style={styles.centerLabel}>
          <Text style={styles.centerTitle}>Entradas</Text>
          <Text style={[styles.centerValue, { color: "#4CAF50" }]}>
            R$ {income.toFixed(2)}
          </Text>
          <Text style={styles.centerPercentage}>{incomePercentage}%</Text>
        </View>
      );
    }

    if (activeSlice === "expense") {
      return (
        <View style={styles.centerLabel}>
          <Text style={styles.centerTitle}>Saídas</Text>
          <Text style={[styles.centerValue, { color: "#E53935" }]}>
            R$ {expense.toFixed(2)}
          </Text>
          <Text style={styles.centerPercentage}>{expensePercentage}%</Text>
        </View>
      );
    }

    return (
      <View style={styles.centerLabel}>
        <Text style={styles.centerTitle}>Saldo</Text>
        <Text
          style={[
            styles.centerValue,
            { color: balance >= 0 ? "#4CAF50" : "#E53935" },
          ]}
        >
          R$ {balance.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo Financeiro</Text>

      <PieChart
        data={data}
        donut
        showGradient
        sectionAutoFocus
        radius={95}
        innerRadius={60}
        focusOnPress
        showText
        textColor="white"
        textSize={10}
        isAnimated={true}
        animationDuration={1200}
        centerLabelComponent={renderCenter}
      />

      <View style={styles.legend}>
        <TouchableOpacity
          style={styles.legendItem}
          onPress={() => setActiveSlice("income")}
        >
          <View style={[styles.legendColor, { backgroundColor: "#4CAF50" }]} />
          <Text>Entradas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.legendItem}
          onPress={() => setActiveSlice("expense")}
        >
          <View style={[styles.legendColor, { backgroundColor: "#E53935" }]} />
          <Text>Saídas</Text>
        </TouchableOpacity>
      </View>

      {activeSlice && (
        <TouchableOpacity onPress={() => setActiveSlice(null)}>
          <Text style={styles.resetText}>Toque aqui para voltar ao saldo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 20 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  centerLabel: { justifyContent: "center", alignItems: "center" },
  centerTitle: { fontSize: 14, color: "#555" },
  centerValue: { fontSize: 16, fontWeight: "bold" },
  centerPercentage: { fontSize: 12, color: "#888" },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  resetText: {
    fontSize: 12,
    color: "#000",
    marginTop: 12,
    textDecorationLine: "underline",
  },
});
