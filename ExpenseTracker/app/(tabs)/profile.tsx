import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useExpense } from '../../src/context/ExpenseContext';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {

  const { user, logout, updateUser } = useAuth();
  const { transactions, totalIncome, totalExpense, balance } = useExpense();
  const router = useRouter();

  // editing state - true matlab edit mode on
  const [editing, setEditing] = useState(false);

  // editable fields
  const [name, setName] = useState(user?.name || '');

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Name cannot be empty!');
      return;
    }
    // updateUser function call karo
    updateUser(name, user?.email);
    // editing mode band karo
    setEditing(false);
    alert('Profile updated!');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileLogo}>
            <Image
              source={require('../../assets/images/profile-picture.png')}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.Name}>{user?.name || 'User'}</Text>
            <Text style={styles.email}>{user?.email || 'No email'}</Text>
          </View>

          {/* Edit Profile Button - sirf tab dikhao jab editing nahi */}
          {!editing && (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditing(true)}
            >
              <Ionicons name="pencil" size={14} color="#fff" />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Edit Form - sirf editing mode mein dikhao */}
        {editing && (
          <View style={styles.editForm}>
            <Text style={styles.editTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#94a3b8"
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={user?.email || ''}
              editable={false}
              // email editable nahi hai
            />
            <Text style={styles.inputHint}>Email cannot be changed</Text>

            <View style={styles.editBtns}>
              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setName(user?.name || '');
                  setEditing(false);
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info Card - sirf viewing mode mein dikhao */}
        {!editing && (
          <View style={styles.infoCard}>
            <View style={styles.info}>
              <Text style={styles.nameLabel}>Full Name</Text>
              <Text style={styles.infoName}>{user?.name || 'User'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.emailLabel}>Email</Text>
              <Text style={styles.infoEmail}>{user?.email || 'No email'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.currencyLabel}>Currency</Text>
              <Text style={styles.currency}>Rs</Text>
            </View>
          </View>
        )}

        {/* Stats Section */}
        <View style={styles.statusSection}>
          <View style={styles.statusItems}>
            <Text style={styles.statusNumber}>{transactions.length}</Text>
            <Text style={styles.statusLabel}>Transactions</Text>
          </View>
          <View style={styles.statusItems}>
            <Text style={[styles.statusNumber, { color: '#10b981' }]}>
              Rs {(totalIncome / 1000).toFixed(1)}k
            </Text>
            <Text style={styles.statusLabel}>Income</Text>
          </View>
          <View style={styles.statusItems}>
            <Text style={[styles.statusNumber, { color: '#ef4444' }]}>
              Rs {(totalExpense / 1000).toFixed(1)}k
            </Text>
            <Text style={styles.statusLabel}>Expenses</Text>
          </View>
          <View style={styles.statusItems}>
            <Text style={[styles.statusNumber, { color: balance >= 0 ? '#10b981' : '#ef4444' }]}>
              Rs {(balance / 1000).toFixed(1)}k
            </Text>
            <Text style={styles.statusLabel}>Balance</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    backgroundColor: '#1e3a5f',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileLogo: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, overflow: 'hidden',
  },
  userDetail: { alignItems: 'center' },
  Name: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  email: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, marginTop: 12,
  },
  editBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  editForm: {
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, margin: 20,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  editTitle: { color: '#1e293b', fontSize: 16, fontWeight: '700', marginBottom: 16 },
  inputLabel: { color: '#94a3b8', fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  input: {
    backgroundColor: '#f8fafc', borderRadius: 10,
    padding: 12, color: '#1e293b', fontSize: 14,
    borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 14,
  },
  inputDisabled: { backgroundColor: '#f1f5f9', color: '#94a3b8' },
  inputHint: { color: '#94a3b8', fontSize: 11, marginTop: -10, marginBottom: 14 },
  editBtns: { flexDirection: 'row', gap: 10 },
  cancelBtn: {
    flex: 1, padding: 12, borderRadius: 10,
    backgroundColor: '#f1f5f9', alignItems: 'center',
  },
  cancelBtnText: { color: '#64748b', fontSize: 14, fontWeight: '600' },
  saveBtn: {
    flex: 1, padding: 12, borderRadius: 10,
    backgroundColor: '#1e3a5f', alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  infoCard: {
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, margin: 20,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  info: { paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#e2e8f0' },
  nameLabel: { color: '#94a3b8', fontSize: 11, marginBottom: 4 },
  infoName: { color: '#1e293b', fontSize: 15, fontWeight: '600' },
  emailLabel: { color: '#94a3b8', fontSize: 11, marginBottom: 4 },
  infoEmail: { color: '#1e293b', fontSize: 15, fontWeight: '600' },
  currencyLabel: { color: '#94a3b8', fontSize: 11, marginBottom: 4 },
  currency: { color: '#1e293b', fontSize: 15, fontWeight: '600' },
  statusSection: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 20, gap: 12,
  },
  statusItems: {
    width: '45%', backgroundColor: '#fff',
    borderRadius: 14, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  statusNumber: { fontSize: 20, fontWeight: '800', color: '#1e293b', marginBottom: 4 },
  statusLabel: { fontSize: 12, color: '#94a3b8' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginHorizontal: 20, marginTop: 20, marginBottom: 30,
    padding: 16, borderWidth: 1.5, borderColor: '#ef4444',
    borderRadius: 10, backgroundColor: '#f8fafc',
  },
  logoutText: { color: '#ef4444', fontSize: 15, fontWeight: '700' },
});