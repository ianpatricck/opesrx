import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { addTransaction } from "../database/transactions";

export default function AddTransactionScreen() {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [note, setNote] = useState("");

  const handleSave = async () => {
    if (!title || !amount) {
      Alert.alert("Campos obrigatórios", "Preencha o título e o valor.");
      return;
    }

    const newTransition = {
      title,
      category: category || "Geral",
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString(),
      note: note || "",
    };

    try {
      await addTransaction(newTransition);
      Alert.alert("Sucesso", "Transação adicionada com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar a transação.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nova Transação</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Nota"
        value={note}
        onChangeText={setNote}
      />

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type == "income" && styles.activeIncome]}
          onPress={() => setType("income")}
        >
          <Text style={styles.typeText}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, type == "expense" && styles.activeExpense]}
          onPress={() => setType("expense")}
        >
          <Text style={styles.typeText}>Saida</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f2f2f2" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  typeButton: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#ddd",
  },
  activeIncome: { backgroundColor: "#4CAF50" },
  activeExpense: { backgroundColor: "#E53935" },
  typeText: { color: "#fff", fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
