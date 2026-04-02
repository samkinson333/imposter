import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GameContext } from '../contexts/GameContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleScreen({ navigation }) {
  const { players, imposterIndex, currentWord, language, setLanguage, t } = useContext(GameContext);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showRole, setShowRole] = useState(false);

  const handleNext = () => {
    if (showRole) {
      if (currentPlayer < players.length - 1) {
        setShowRole(false);
        setCurrentPlayer(currentPlayer + 1);
      } else {
        navigation.navigate('Clue');
      }
    } else {
      setShowRole(true);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'malayalam' : 'english');
  };

  // Give the imposter one real clue to start them off
  const getImposterClue = () => {
    const clues = currentWord[`clues_${language}`];
    if (clues && clues.length > 0) {
      // Use the first clue as a solid hint, or pick one randomly
      return clues[0];
    }
    return language === 'english' ? "Say something generic about the category." : "വിഭാഗത്തെക്കുറിച്ച് പൊതുവായ എന്തെങ്കിലും പറയുക.";
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

      <Text style={styles.title}>{t.player} {currentPlayer + 1}</Text>
      
      {!showRole ? (
        <View style={styles.card}>
          <Text style={styles.instructionText}>{t.passPhoneTo}</Text>
          <Text style={styles.playerName}>{players[currentPlayer].name}</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={handleNext}>
            <Text style={styles.actionText}>{t.showRole}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.instructionText}>{t.yourRole}</Text>
          {currentPlayer === imposterIndex ? (
            <>
              <Text style={styles.roleTextImposter}>{t.youAreImposter}</Text>
              <Text style={styles.clueLabel}>{t.imposterClueLabel}</Text>
              <Text style={styles.clueWord}>{currentWord[`category_${language}`]}</Text>
              
              <View style={styles.cluesContainer}>
                <Text style={styles.cluesTitle}>{language === 'english' ? 'Secret Clue (to help you fake it):' : 'രഹസ്യ സൂചന (ഇംപോസ്റ്ററിന്):'}</Text>
                <Text style={styles.clueItem}>• {getImposterClue()}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.roleText}>{t.theWordIs}</Text>
              <Text style={styles.wordText}>{currentWord[language]}</Text>
              {currentWord.reference && (
                <Text style={styles.referenceText}>📖 {currentWord.reference}</Text>
              )}
              {currentWord[`clues_${language}`] && (
                <View style={styles.cluesContainer}>
                  <Text style={styles.cluesTitle}>{language === 'english' ? 'Ideas for Clues:' : 'സൂചനകൾ:'}</Text>
                  {currentWord[`clues_${language}`].map((clue, index) => (
                    <Text key={index} style={styles.clueItem}>• {clue}</Text>
                  ))}
                </View>
              )}
            </>
          )}
          
          <TouchableOpacity style={styles.actionBtnHide} onPress={handleNext}>
            <Text style={styles.actionText}>{currentPlayer < players.length - 1 ? t.hideRole : t.clueRound}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c3e50', alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
  langToggleBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  langToggleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ecf0f1', marginBottom: 40, marginTop: 40 },
  card: { backgroundColor: '#ecf0f1', padding: 30, borderRadius: 20, alignItems: 'center', width: '90%', elevation: 5 },
  instructionText: { fontSize: 20, color: '#7f8c8d', marginBottom: 15, textAlign: 'center' },
  playerName: { fontSize: 36, fontWeight: 'bold', color: '#2c3e50', marginBottom: 30, textAlign: 'center' },
  actionBtn: { backgroundColor: '#3498db', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, width: '100%', alignItems: 'center' },
  actionBtnHide: { backgroundColor: '#e74c3c', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, width: '100%', alignItems: 'center' },
  actionText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  roleText: { fontSize: 24, color: '#2c3e50', marginBottom: 10, textAlign: 'center' },
  wordText: { fontSize: 40, fontWeight: 'bold', color: '#27ae60', marginBottom: 30, textAlign: 'center' },
  roleTextImposter: { fontSize: 28, fontWeight: 'bold', color: '#c0392b', marginBottom: 20, textAlign: 'center' },
  clueLabel: { fontSize: 20, color: '#7f8c8d', marginBottom: 5, textAlign: 'center' },
  clueWord: { fontSize: 32, fontWeight: 'bold', color: '#8e44ad', marginBottom: 30, textAlign: 'center' },
  referenceText: { fontSize: 16, color: '#7f8c8d', marginBottom: 15, fontStyle: 'italic', textAlign: 'center' },
  cluesContainer: { marginTop: 10, marginBottom: 20, width: '100%', paddingHorizontal: 20 },
  cluesTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 5 },
  clueItem: { fontSize: 16, color: '#2c3e50', marginBottom: 3 },
});
