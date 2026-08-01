// Ionicons - icons k liye
import { Ionicons } from "@expo/vector-icons";

// useState - state manage karne k liye
import { useState } from "react";

// React Native components
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// useExpense - transaction add karne k liye
import { useExpense } from "../../src/context/ExpenseContext";

// useRouter - back navigate karne k liye
import { useRouter } from "expo-router";

// Categories ki list - icon aur label k saath
const CATEGORIES = [
  { id: 'food', label: 'Food', icon: '🍔' },
  { id: 'travel', label: 'Travel', icon: '🚌' },
  { id: 'fun', label: 'Fun', icon: '🎬' },
  { id: 'shopping', label: 'Shopping', icon: '🛒' },
  { id: 'health', label: 'Health', icon: '💊' },
  { id: 'other', label: 'Other', icon: '📦' },
];

const AddExpense = () => {

  // type state - expense ya income
  const [type, setType] = useState('expense');

  // amount state - kitna paisa
  const [amount, setAmount] = useState('');

  // description state - kya kharida
  const [description, setDescription] = useState('');

  // category state - kaunsi category - default food
  const [category, setCategory] = useState('food');

  // ExpenseContext se addTransaction function lo
  const { addTransaction } = useExpense();

  // Router lo - back jane k liye
  const router = useRouter();

  // Save button press hone par yeh chalega
 const handleSave = () => {
    if (!amount) {
      alert('Please enter amount!');
      return;
    }
    if (isNaN(Number(amount))) {
      alert('Please enter valid amount!');
      return;
    }

    // Selected category ka label lo
    const selectedCategory = CATEGORIES.find(c => c.id === category);

   const transaction = {
  title: description || selectedCategory?.label || category,
  // agar description hai to description, warna category label
  amount: Number(amount),
  type: type,
  category: category,
  icon: selectedCategory?.icon || '📦',
  date: new Date().toISOString(),
};

    addTransaction(transaction);
    alert('Transaction saved!');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Transaction</Text>
        </View>

        {/* Expense / Income Toggle */}
        <View style={styles.btnSection}>
          <TouchableOpacity
            style={type === 'expense' ? styles.expenseBtn : styles.incomBtn}
            onPress={() => setType('expense')}
          >
            <Text style={type === 'expense' ? styles.expenseBtnText : styles.incomBtnText}>
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={type === 'income' ? styles.expenseBtn : styles.incomBtn}
            onPress={() => setType('income')}
          >
            <Text style={type === 'income' ? styles.expenseBtnText : styles.incomBtnText}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Box */}
        <View style={styles.amountBox}>
          <Text style={styles.amountBoxLabel}>Amount (Rs)</Text>
          <TextInput
            style={styles.amountValue}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#94a3b8"
          />
        </View>

        {/* Description Input */}
        <TextInput
          style={styles.descriptionSection}
          placeholder="Description (optional)"
          placeholderTextColor="#475569"
          value={description}
          onChangeText={setDescription}
        />

        {/* Category Section */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Category</Text>
          <View style={styles.categoryList}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryBtn,
                  category === cat.id && styles.categoryBtnActive,
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <Text style={[
                  styles.categoryBtnText,
                  category === cat.id && styles.categoryBtnTextActive,
                ]}>
                  {cat.icon} {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
        >
          <Text style={styles.btnText}>Save Transaction</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  header: {
    backgroundColor: '#1e3a5f',
    flexDirection: 'row',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  btnSection: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  expenseBtn: {
    flex: 1,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  expenseBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  incomBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  incomBtnText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  amountBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 12,
    padding: 20,
  },
  amountBoxLabel: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
  },
  descriptionSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    fontSize: 15,
  },
  categorySection: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryBtnActive: {
    backgroundColor: '#1e3a5f',
    borderColor: '#1e3a5f',
  },
  categoryBtnText: {
    color: '#475569',
    fontSize: 13,
  },
  categoryBtnTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});