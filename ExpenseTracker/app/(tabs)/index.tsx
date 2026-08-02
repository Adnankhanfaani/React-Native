// Ionicons - icons k liye
import { Ionicons } from "@expo/vector-icons";

// React Native components
import { ScrollView, StyleSheet, Text, View } from "react-native";

// useAuth - user ka naam lene k liye
import { useAuth } from "../../src/context/AuthContext";

// useExpense - real transactions lene k liye
import { useExpense } from "../../src/context/ExpenseContext";

export default function HomeScreen() {

  // AuthContext se user ka data lo
  const { user } = useAuth();

  // ExpenseContext se transactions aur calculations lo
  const { transactions, totalIncome, totalExpense, balance } = useExpense();

  // Aaj ki date nikalo - Daily expense k liye
  const today = new Date().toDateString();

  // Daily expense calculate karo - sirf aaj ki transactions
  const dailyExpense = transactions

  // @ts-ignore
    .filter(t => 

      t.type === 'expense' && // sirf expenses lo
      new Date(t.date).toDateString() === today // sirf aaj ki
    )

    // @ts-ignore
    .reduce((sum, t) => sum + t.amount, 0); // sab add karo

  // Monthly expense calculate karo
  const currentMonth = new Date().getMonth(); // current month number
  const monthlyExpense = transactions

  // @ts-ignore
    .filter(t =>
      t.type === 'expense' && // sirf expenses lo
      new Date(t.date).getMonth() === currentMonth // sirf is mahine ki
    )
    // @ts-ignore
    .reduce((sum, t) => sum + t.amount, 0); // sab add karo

  // Recent 5 transactions lo
  const recentTransactions = transactions.slice(0, 5);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              {/* Good Morning text */}
              <Text style={styles.morningText}>Good Morning</Text>
              {/* User ka naam dikhao - agar nahi hai to "User" dikhao */}
              <Text style={styles.userText}>
                Hi, {user?.name || 'User'}
              </Text>
            </View>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </View>

          {/* Total Balance */}
          <Text style={styles.totalBalanceText}>Total Balance</Text>
          {/* Real balance dikhao */}
          <Text style={styles.balanceText}>
            Rs {balance.toLocaleString()}
          </Text>

          {/* Daily aur Monthly Cards */}
          <View style={styles.cardsSection}>
            <View style={styles.Cards}>
              <Text style={styles.cardsLabel}>Daily</Text>
              {/* Real daily expense dikhao */}
              <Text style={styles.dailyAmount}>
                Rs {dailyExpense.toLocaleString()}
              </Text>
            </View>
            <View style={styles.Cards}>
              <Text style={styles.cardsLabel}>Monthly</Text>
              {/* Real monthly expense dikhao */}
              <Text style={styles.monthlyAmount}>
                Rs {monthlyExpense.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Expenses Section */}
        <View style={styles.recentExpenses}>
          <Text style={styles.expenseTitle}>Recent Expenses</Text>
        </View>

        {/* Agar koi transaction nahi hai to message dikhao */}
        {recentTransactions.length === 0 ? (
          <Text style={styles.noExpense}>No expenses added yet!</Text>
        ) : (
          // Transactions ki list dikhao

          // @ts-ignore
          recentTransactions.map((item) => (
            <View key={item.id} style={styles.RecentExpensRow}>

              {/* Icon */}
              <View style={styles.expenseIcon}>
                <Text>{item.icon || '📦'}</Text>
              </View>

              {/* Title aur Category */}
              <View style={styles.expensDetail}>
                <Text style={styles.expenseItemTitle}>{item.title}</Text>
                <Text style={styles.expenseItemCategory}>{item.category}</Text>
              </View>

              {/* Amount - negative to red, positive to green */}
              <Text style={[
                styles.expenseAmount,
                item.type === 'expense' ? styles.negative : styles.positive
              ]}>
                {item.type === 'expense'
                  ? "-Rs " + item.amount.toLocaleString()
                  : "+Rs " + item.amount.toLocaleString()}
              </Text>

            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#1e3a5f",
    paddingTop: 50,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  morningText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },
  userText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  totalBalanceText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    marginTop: 8,
  },
  balanceText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    marginVertical: 4,
  },
  cardsSection: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  Cards: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    paddingVertical: 20,
  },
  cardsLabel: {
    color: "#475569",
    fontSize: 11,
  },
  dailyAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
    color: "#34d399",
  },
  monthlyAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
    color: "#f87171",
  },
  recentExpenses: {
    padding: 20,
    paddingBottom: 8,
  },
  expenseTitle: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  noExpense: {
    // Koi expense nahi hai to center mein dikhao
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 40,
  },
  RecentExpensRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
  },
  expenseIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  expensDetail: {
    flex: 1,
  },
  expenseItemTitle: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '600',
  },
  expenseItemCategory: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: "700",
  },
  negative: {
    color: "#ef4444",
  },
  positive: {
    color: "#10b981",
  },
});