import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { GameContext } from '../contexts/GameContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const { language, setLanguage, numPlayers, setNumPlayers, t, startNewGame, score } = useContext(GameContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStart = () => {
    startNewGame();
    navigation.navigate('Role');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t.appName}</Text>

      <View style={styles.languageContainer}>
        <TouchableOpacity 
          style={[styles.langBtn, language === 'english' && styles.langBtnActive]}
          onPress={() => setLanguage('english')}>
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.langBtn, language === 'malayalam' && styles.langBtnActive]}
          onPress={() => setLanguage('malayalam')}>
          <Text style={styles.langText}>മലയാളം</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playerSelectContainer}>
        <Text style={styles.playersLabel}>{t.players}: {numPlayers}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => setNumPlayers(Math.max(3, numPlayers - 10))}>
            <Text style={styles.controlText}>-10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={() => setNumPlayers(Math.max(3, numPlayers - 1))}>
            <Text style={styles.controlText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={() => setNumPlayers(Math.min(80, numPlayers + 1))}>
            <Text style={styles.controlText}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={() => setNumPlayers(Math.min(80, numPlayers + 10))}>
            <Text style={styles.controlText}>+10</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
        <Text style={styles.startBtnText}>{t.startGame}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.howToPlayBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.howToPlayText}>{t.howToPlay}</Text>
      </TouchableOpacity>

      <View style={styles.scoreBoard}>
        <Text style={styles.scoreTitle}>{t.scoreboard}</Text>
        <Text style={styles.scoreText}>{t.playersScore}: {score.players}  |  {t.imposterScore}: {score.imposter}</Text>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.howToPlay}</Text>
            <ScrollView>
              <Text style={styles.modalText}>{t.howToPlayText}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcf3cf', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#8e44ad', marginBottom: 40, textAlign: 'center' },
  languageContainer: { flexDirection: 'row', marginBottom: 30 },
  langBtn: { padding: 10, borderWidth: 1, borderColor: '#8e44ad', borderRadius: 10, marginHorizontal: 5 },
  langBtnActive: { backgroundColor: '#8e44ad' },
  langText: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  playerSelectContainer: { alignItems: 'center', marginBottom: 40 },
  playersLabel: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  controls: { flexDirection: 'row' },
  controlBtn: { backgroundColor: '#3498db', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginHorizontal: 5 },
  controlText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  startBtn: { backgroundColor: '#27ae60', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 25, marginBottom: 20 },
  startBtnText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  howToPlayBtn: { backgroundColor: '#e67e22', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 },
  howToPlayText: { fontSize: 18, color: '#fff' },
  scoreBoard: { marginTop: 40, alignItems: 'center' },
  scoreTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  scoreText: { fontSize: 16, color: '#555', marginTop: 5 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#8e44ad' },
  modalText: { fontSize: 18, lineHeight: 28, color: '#333' },
  closeBtn: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  closeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
