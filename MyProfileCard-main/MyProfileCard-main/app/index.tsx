import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

// Image Path (Ensure your image is in assets/assets/ folder)
const MyProfilePic = require('../assets/assets/myImage4.png');

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* 🖼️ Main Card Container */}
      <View style={styles.card}>
        
        {/* 🖼️ Profile Image */}
        <Image 
          source={MyProfilePic} 
          style={styles.profileImage} 
        />

        {/* 👤 Name and Role */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Adnan khan</Text>
          <Text style={styles.role}>React Native Developer</Text>
        </View>

        {/* 🔘 Two buttons: Follow & Message (Using Flexbox Row) */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.followBtn]}>
            <Text style={styles.buttonText}>Follow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.messageBtn]}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center', // Center content inside card
    elevation: 5, // Shadow for Android
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Making image circular
    marginBottom: 15,
    resizeMode: 'contain',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    // 💡 Layout Hint: Flexbox for button alignment
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  followBtn: {
    backgroundColor: '#007AFF',
  },
  messageBtn: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
