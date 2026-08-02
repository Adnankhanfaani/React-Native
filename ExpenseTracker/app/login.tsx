// React se useState hook import kar rahe hain - state manage karne k liye
import { useState } from 'react';

// React Native ke components import kar rahe hain
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// SafeAreaView import kar rahe hain - phone ke notch se safe rakhta hai
import { SafeAreaView } from "react-native-safe-area-context";

// useAuth hook import kar rahe hain - login/signup functions milenge
import { useAuth } from '../src/context/AuthContext';

// useRouter import kar rahe hain - screen navigate karne k liye
import { useRouter } from 'expo-router';

const LoginScreen = () => {

  // isLogin = true matlab Login mode, false matlab SignUp mode
  const [isLogin, setIsLogin] = useState(true);

  // name state - SignUp mein user ka naam store karega
  const [name, setName] = useState('');

  // email state - user ka email store karega
  const [email, setEmail] = useState('');

  // password state - user ka password store karega
  const [password, setPassword] = useState('');

  // AuthContext se login aur signup functions lo
  const { login, signup } = useAuth();

  // Router lo - screen change karne k liye
  const router = useRouter();

  // handleLogin - jab user Login button dabaye
  const handleLogin = async () => {
  if (!email || !password) {
    alert('Please fill all fields!');
    return;
  }
  const result = await login(email, password);
  if (!result.success) {
    alert(result.message);
    return;
  }
  router.replace('/(tabs)');
};

  // handleSignUp - jab user Sign Up button dabaye
const handleSignUp = async () => {
  if (!name || !email || !password) {
    alert('Please fill all fields!');
    return;
  }
  const result = await signup(name, email, password);
  if (!result.success) {
    alert(result.message);
    return;
  }
   // Dashboard pe nahi — Login mode pe wapas jao
  alert('Account created! Please login now.');
  setIsLogin(true);  // Login tab pe wapas jao
  setName('');      // Fields clear karo
  setPassword(''); // Password clear karo
   // Email rakho taake user dobara type na kare
};

  return (
    // SafeAreaView - phone ke edges se safe rakhta hai
    <SafeAreaView style={styles.container}>

      {/* Header - app ka logo aur naam */}
      <View style={styles.header}>
        <Text style={styles.icon}>💳</Text>
        <Text style={styles.appName}>Expense Tracker</Text>
        <Text style={styles.appTagline}>Smart money management</Text>
      </View>

      {/* Card - form ka white box */}
      <View style={styles.card}>

        {/* Toggle Buttons - Login ya SignUp mode select karo */}
        <View style={styles.loginSignUp}>

          {/* Login Button - press karo to Login mode on ho */}
          <TouchableOpacity
            style={isLogin ? styles.login : styles.signUp}
            // isLogin true hai to navy blue, warna gray
            onPress={() => setIsLogin(true)}
            // press karo to isLogin true ho jaye
          >
            <Text style={isLogin ? styles.loginText : styles.signUpText}>Login</Text>
          </TouchableOpacity>

          {/* SignUp Button - press karo to SignUp mode on ho */}
          <TouchableOpacity
            style={isLogin ? styles.signUp : styles.login}
            // isLogin false hai to navy blue, warna gray
            onPress={() => setIsLogin(false)}
            // press karo to isLogin false ho jaye
          >
            <Text style={isLogin ? styles.signUpText : styles.loginText}>Sign Up</Text>
          </TouchableOpacity>

        </View>

        {/* Name Field - sirf SignUp mode mein dikhega */}
        {!isLogin && (
          <TextInput
            placeholder="Enter your Name"
            style={styles.input}
            value={name}
            // value = name state se connected hai
            onChangeText={setName}
            // jab type karo to name state update ho
          />
        )}

        {/* Email Input - dono modes mein dikhega */}
        <TextInput
          placeholder="Enter your Email"
          keyboardType="email-address"
          // phone pe @ wala keyboard khulega
          style={styles.input}
          value={email}
          // value = email state se connected hai
          onChangeText={setEmail}
          // jab type karo to email state update ho
        />

        {/* Password Input - dono modes mein dikhega */}
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          // password dots mein dikhega
          style={styles.input}
          value={password}
          // value = password state se connected hai
          onChangeText={setPassword}
          // jab type karo to password state update ho
        />

        {/* Forgot Password - sirf Login mode mein dikhega */}
        {isLogin && (
          <TouchableOpacity style={styles.forgetButton}>
            <Text style={styles.fongetText}>Forget password?</Text>
          </TouchableOpacity>
        )}

        {/* Main Button - Login ya SignUp mode k hisaab se */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={isLogin ? handleLogin : handleSignUp}
          // isLogin true hai to handleLogin, warna handleSignUp
        >
          <Text style={styles.loginBtnText}>
            {isLogin ? 'Login' : 'Sign Up'}
            {/* isLogin true hai to Login dikhao, warna Sign Up */}
          </Text>
        </TouchableOpacity>

        {/* Bottom Link - mode switch karne k liye */}
        <View style={styles.signUpLink}>
          <Text style={styles.signUpLinkText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            {/* mode k hisaab se text change hoga */}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            {/* !isLogin matlab opposite mode pe jao */}
            <Text style={styles.linkBtnText}>
              {isLogin ? ' Sign Up' : ' Login'}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  // Poori screen ka background
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  // Top navy blue header
  header: {
    backgroundColor: "#1e3a5f",
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  // Emoji icon
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  // App ka naam
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  // App ka tagline
  appTagline: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },
  // White form card
  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  // Toggle buttons container
  loginSignUp: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  // Active button - navy blue
  login: {
    flex: 1,
    backgroundColor: "#1e3a5f",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  // Active button text - white
  loginText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  // Inactive button - transparent
  signUp: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  // Inactive button text - gray
  signUpText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "700",
  },
  // Bottom link text
  signUpLinkText: {
    color: "#94a3b8",
    fontSize: 13,
  },
  // Input fields styling
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#1e293b",
    marginBottom: 12,
  },
  // Forgot password button
  forgetButton: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  // Forgot password text
  fongetText: {
    color: "#1e3a5f",
    fontSize: 13,
    fontWeight: "600",
  },
  // Main login/signup button
  loginBtn: {
    backgroundColor: "#1e3a5f",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  // Main button text
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  // Bottom link row
  signUpLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  // Bottom link button text
  linkBtnText: {
    color: "#1e3a5f",
    fontSize: 13,
    fontWeight: "700",
  },
});

