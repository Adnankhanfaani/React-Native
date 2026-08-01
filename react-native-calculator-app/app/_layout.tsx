import React, { useState } from 'react';
import {
  LayoutAnimation,
  NativeModules // Trigger native system sound effects
  ,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  Vibration,
  View
} from 'react-native';

// Enable LayoutAnimations for Android devices
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [displayExpression, setDisplayExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  // Function to handle button presses
  const handlePress = (val: string) => {
    // 1. Physical Feedback (Vibration)
    Vibration.vibrate(Platform.OS === 'android' ? 15 : 1);

    // 2. Native System Sound Trigger (No library needed)
    if (Platform.OS === 'android') {
      try {
        NativeModules.UIManager.playTouchSound && NativeModules.UIManager.playTouchSound();
      } catch (e) {
        console.log("Sound Error:", e);
      }
    }

    // 3. Smooth UI Transition Animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Logic for different buttons
    if (val === 'C') {
      setDisplayExpression('');
      setResult('');
    } else if (val === 'DEL') {
      setDisplayExpression(displayExpression.slice(0, -1));
    } else if (val === '=') {
      if (displayExpression) calculateResult();
    } else if (val === 'sq') {
      setDisplayExpression(displayExpression + '²');
    } else if (val === 'cu') {
      setDisplayExpression(displayExpression + '³');
    } else if (val === 'sin' || val === 'cos') {
      setDisplayExpression(displayExpression + val + '(');
    } else {
      setDisplayExpression(displayExpression + val);
    }
  };

  // Logic to calculate results and manage history
  const calculateResult = () => {
    try {
      let mathExpression = displayExpression
        .replace(/²/g, '**2')
        .replace(/³/g, '**3')
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/sin\(([^)]+)\)/g, (match, num) => `Math.sin(${num} * Math.PI / 180)`)
        .replace(/cos\(([^)]+)\)/g, (match, num) => `Math.cos(${num} * Math.PI / 180)`);

      // Auto-closing brackets for incomplete expressions
      const openBrackets = (mathExpression.match(/\(/g) || []).length;
      const closeBrackets = (mathExpression.match(/\)/g) || []).length;
      for (let i = 0; i < openBrackets - closeBrackets; i++) {
        mathExpression += ')';
      }

      const evalResult = eval(mathExpression);
      const finalRes = Number(evalResult.toFixed(4)).toString();
      
      setResult(finalRes);
      // Storing last 5 calculations in history state
      setHistory(prev => [displayExpression + " = " + finalRes, ...prev].slice(0, 5));
    } catch (e) {
      setResult('Error');
    }
  };

  // Reusable Button Component for better readability
  const CalcButton = ({ title, onPress, color = '#ddd', textColor = '#000' }: any) => (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7}
      touchSoundDisabled={false} // Enables standard touch sound
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 1. History Section (Visual requirement for assignment) */}
      <View style={styles.historyWrapper}>
        <ScrollView contentContainerStyle={styles.historyBox} showsVerticalScrollIndicator={false}>
          {history.map((h, i) => <Text key={i} style={styles.hText}>{h}</Text>)}
        </ScrollView>
      </View>

      {/* 2. Main Display Area */}
      <View style={styles.displayContainer}>
        <Text style={styles.expressionText}>{displayExpression || '0'}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      {/* 3. Interactive Buttons Grid */}
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <CalcButton title="sin" color="#9C27B0" textColor="#fff" onPress={() => handlePress('sin')} />
          <CalcButton title="cos" color="#9C27B0" textColor="#fff" onPress={() => handlePress('cos')} />
          <CalcButton title="(" color="#A5A5A5" onPress={() => handlePress('(')} />
          <CalcButton title=")" color="#A5A5A5" onPress={() => handlePress(')')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="x²" color="#2196F3" textColor="#fff" onPress={() => handlePress('sq')} />
          <CalcButton title="x³" color="#2196F3" textColor="#fff" onPress={() => handlePress('cu')} />
          <CalcButton title="C" color="#A5A5A5" onPress={() => handlePress('C')} />
          <CalcButton title="DEL" color="#A5A5A5" onPress={() => handlePress('DEL')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="1" onPress={() => handlePress('1')} />
          <CalcButton title="2" onPress={() => handlePress('2')} />
          <CalcButton title="3" onPress={() => handlePress('3')} />
          <CalcButton title="×" color="#FF9500" textColor="#fff" onPress={() => handlePress('×')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="4" onPress={() => handlePress('4')} />
          <CalcButton title="5" onPress={() => handlePress('5')} />
          <CalcButton title="6" onPress={() => handlePress('6')} />
          <CalcButton title="−" color="#FF9500" textColor="#fff" onPress={() => handlePress('-')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="7" onPress={() => handlePress('7')} />
          <CalcButton title="8" onPress={() => handlePress('8')} />
          <CalcButton title="9" onPress={() => handlePress('9')} />
          <CalcButton title="÷" color="#FF9500" textColor="#fff" onPress={() => handlePress('÷')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="0" onPress={() => handlePress('0')} />
          <CalcButton title="." onPress={() => handlePress('.')} />
          <CalcButton title="+" color="#FF9500" textColor="#fff" onPress={() => handlePress('+')} />
          <CalcButton title="=" color="#4CAF50" textColor="#fff" onPress={() => handlePress('=')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-end' 
  },
  historyWrapper: { 
    height: 110, 
    backgroundColor: '#f9f9f9', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  historyBox: { 
    paddingHorizontal: 20, 
    paddingTop: 30, 
    alignItems: 'flex-end' 
  },
  hText: { 
    fontSize: 16, 
    color: '#888', 
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier', 
    marginBottom: 4 
  },
  displayContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    padding: 20, 
    backgroundColor: '#f0f0f0' 
  },
  expressionText: { 
    fontSize: 35, 
    color: '#666' 
  },
  resultText: { 
    fontSize: 55, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  buttonsContainer: { 
    padding: 8, 
    backgroundColor: '#fff' 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 8 
  },
  button: { 
    flex: 1, 
    margin: 4, 
    height: 62, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 2 
  },
  buttonText: { 
    fontSize: 22, 
    fontWeight: '600' 
  }
});
