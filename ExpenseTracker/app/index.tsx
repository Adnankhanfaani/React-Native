import { Redirect } from 'expo-router';
// useAuth hook import karo
import { useAuth } from '../src/context/AuthContext';

const Index = () => {
  // isLoggedIn check karo
  const { isLoggedIn } = useAuth();

  // Agar login hai to dashboard, warna login page
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/login" />;
};

export default Index;