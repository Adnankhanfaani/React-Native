import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { ExpenseProvider } from '../src/context/ExpenseContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ExpenseProvider>
    </AuthProvider>
  );
}