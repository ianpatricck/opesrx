import { Transaction } from "../types/Transaction";
import { database } from "./database";

type SummaryRow = { total: number | null };

export async function addTransaction(transaction: Transaction) {
  const { type, title, amount, category, date, note } = transaction;
  await database.runAsync(
    `INSERT INTO transactions (type, title, amount, category, date, note)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [type, title, amount, category, date, note],
  );
}

export async function deleteTransaction(id: number) {
  try {
    await database.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    throw error;
  }
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const result = await database.getAllAsync<Transaction>(
    `SELECT * FROM transactions ORDER BY date DESC`,
  );
  return result;
}

export async function getSummary() {
  const incomeResult = await database.getAllAsync<SummaryRow>(
    `SELECT SUM(amount) as total FROM transactions WHERE type='income'`,
  );

  const expenseResult = await database.getAllAsync<SummaryRow>(
    `SELECT SUM(amount) as total FROM transactions WHERE type='expense'`,
  );

  const income = incomeResult[0];
  const expense = expenseResult[0];

  const totalIncome = income?.total || 0;
  const totalExpense = expense?.total || 0;
  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
}
