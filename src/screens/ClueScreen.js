import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GameContext } from '../contexts/GameContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ClueScreen({ navigation }) {
  const { t, language, setLanguage } = useContext(GameContext);

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'malayalam' : 'english');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.langToggleBtn} onPress={toggleLanguage}>
          <Text style={styles.langToggleText}>
            {language === 'english' ? 'A/അ (മലയാളം)' : 'A/അ (English)'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{t.clueRound}</Text>
      
      <View style={styles.card}>
        <Text style={styles.instructions}>{t.clueInstructions}</Text>
        
        <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('Voting')}>
          <Text style={styles.nextText}>{t.goToVoting}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f39c12', alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  langToggleBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  langToggleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff', marginBottom: 40, marginTop: 40, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 20, alignItems: 'center', width: '90%', elevation: 5 },
  instructions: { fontSize: 20, color: '#2c3e50', marginBottom: 40, textAlign: 'center', lineHeight: 30 },
  nextBtn: { backgroundColor: '#e74c3c', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, width: '100%', alignItems: 'center' },
  nextText: { fontSize: 20, color: '#fff', fontWeight: 'bold' }
});
