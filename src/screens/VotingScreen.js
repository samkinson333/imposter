import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GameContext } from '../contexts/GameContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

export default function VotingScreen({ navigation }) {
  const { players, imposterIndex, t, language, setLanguage } = useContext(GameContext);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/vote.mp3') // Make sure to add a dummy vote.mp3 or skip sound in this template
      );
      await sound.playAsync();
    } catch (e) {
      console.log('Error playing sound', e);
    }
  }

  const handleVote = (index) => {
    setSelectedPlayer(index);
    playSound();
    setTimeout(() => {
      navigation.navigate('Result', { votedIndex: index });
    }, 500);
  };

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

      <Text style={styles.title}>{t.votingTitle}</Text>
      <Text style={styles.subtitle}>{t.whoIsImposter}</Text>
      
      <ScrollView contentContainerStyle={styles.list}>
        {players.map((p, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.playerBtn, selectedPlayer === index && styles.selectedBtn]}
            onPress={() => handleVote(index)}
          >
            <Text style={styles.playerText}>{p.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9b59b6', padding: 20 },
  header: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  langToggleBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  langToggleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 40 },
  subtitle: { fontSize: 24, color: '#ecf0f1', textAlign: 'center', marginBottom: 30 },
  list: { alignItems: 'center', width: '100%', paddingBottom: 50 },
  playerBtn: { backgroundColor: '#fff', paddingVertical: 15, width: '90%', borderRadius: 10, marginVertical: 10, alignItems: 'center', elevation: 3 },
  selectedBtn: { backgroundColor: '#f1c40f' },
  playerText: { fontSize: 20, color: '#2c3e50', fontWeight: 'bold' }
});
