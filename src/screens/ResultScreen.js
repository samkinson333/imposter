import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GameContext } from '../contexts/GameContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

export default function ResultScreen({ route, navigation }) {
  const { votedIndex } = route.params;
  const { players, imposterIndex, t, updateScore, currentWord, language, setLanguage } = useContext(GameContext);
  const [showGuessPrompt, setShowGuessPrompt] = useState(false);
  const [resultResolved, setResultResolved] = useState(false);

  const imposterCaught = votedIndex === imposterIndex;

  useEffect(() => {
    playSound(imposterCaught);
  }, []);

  async function playSound(success) {
    try {
      const asset = success 
        ? require('../../assets/win.mp3') 
        : require('../../assets/lose.mp3');
      const { sound } = await Audio.Sound.createAsync(asset);
      await sound.playAsync();
    } catch (e) {
      console.log('Error playing sound', e);
    }
  }

  const handleImposterGuess = (guessedCorrectly) => {
    if (guessedCorrectly) {
      updateScore('imposter');
    } else {
      updateScore('players');
    }
    setResultResolved(true);
    setShowGuessPrompt(false);
  };

  const handleInitialResult = () => {
    if (imposterCaught) {
      setShowGuessPrompt(true);
    } else {
      updateScore('imposter');
      setResultResolved(true);
    }
  };

  const handlePlayAgain = () => {
    navigation.navigate('Home');
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

      <Text style={styles.title}>{t.resultTitle}</Text>
      
      {!showGuessPrompt && !resultResolved && (
        <View style={styles.card}>
          <Text style={styles.revealText}>{imposterCaught ? t.imposterCaught : t.imposterSurvived}</Text>
          <Text style={styles.infoText}>{t.theImposterWas} <Text style={styles.highlight}>{players[imposterIndex].name}</Text></Text>
          <Text style={styles.infoText}>{t.theWordIs} <Text style={styles.highlight}>{currentWord[language]}</Text></Text>
          
          <TouchableOpacity style={styles.nextBtn} onPress={handleInitialResult}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {showGuessPrompt && (
        <View style={styles.card}>
          <Text style={styles.promptText}>{t.imposterGuessed}</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.choiceBtn, { backgroundColor: '#27ae60' }]} onPress={() => handleImposterGuess(true)}>
              <Text style={styles.choiceText}>{t.yes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.choiceBtn, { backgroundColor: '#e74c3c' }]} onPress={() => handleImposterGuess(false)}>
              <Text style={styles.choiceText}>{t.no}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {resultResolved && (
        <View style={styles.card}>
          <Text style={styles.winnerText}>
             {!imposterCaught ? t.imposterWins : (showGuessPrompt ? '' : t.playersWin)} {/* Simplified for flow */}
             {imposterCaught ? t.playersWin : t.imposterWins}
          </Text>
          <TouchableOpacity style={styles.playAgainBtn} onPress={handlePlayAgain}>
            <Text style={styles.playAgainText}>{t.playAgain}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#34495e', padding: 20, justifyContent: 'center', alignItems: 'center' },
  header: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  langToggleBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  langToggleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#fff', marginBottom: 30, marginTop: 40 },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 20, width: '90%', alignItems: 'center', elevation: 5 },
  revealText: { fontSize: 28, fontWeight: 'bold', color: '#e74c3c', marginBottom: 20, textAlign: 'center' },
  infoText: { fontSize: 20, color: '#2c3e50', marginBottom: 10, textAlign: 'center' },
  highlight: { fontWeight: 'bold', color: '#8e44ad' },
  nextBtn: { backgroundColor: '#3498db', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, marginTop: 20, width: '100%', alignItems: 'center' },
  nextText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  promptText: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 30, textAlign: 'center' },
  btnRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  choiceBtn: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, width: '40%', alignItems: 'center' },
  choiceText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  winnerText: { fontSize: 36, fontWeight: 'bold', color: '#27ae60', marginBottom: 40, textAlign: 'center' },
  playAgainBtn: { backgroundColor: '#2980b9', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25, width: '100%', alignItems: 'center' },
  playAgainText: { fontSize: 24, color: '#fff', fontWeight: 'bold' }
});
