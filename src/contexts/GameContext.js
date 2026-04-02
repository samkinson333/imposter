import React, { createContext, useState, useEffect } from 'react';
import bibleWords from '../../bibleWords.json';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [language, setLanguage] = useState('english'); // 'english' or 'malayalam'
  const [numPlayers, setNumPlayers] = useState(4);
  const [players, setPlayers] = useState([]);
  const [imposterIndex, setImposterIndex] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [score, setScore] = useState({ players: 0, imposter: 0 });

  const textDict = {
    english: {
      appName: "Bible Imposter",
      startGame: "Start Game",
      players: "Players",
      howToPlay: "How to Play",
      howToPlayText: "1. Select players.\n2. Pass the phone to see roles.\n3. The Imposter tries to guess the word.\n4. Give clues out loud.\n5. Vote out the Imposter!",
      close: "Close",
      setupTitle: "Game Setup",
      passPhoneTo: "Pass the phone to",
      player: "Player",
      showRole: "Show My Role",
      hideRole: "Hide Role & Next",
      yourRole: "Your Role",
      theWordIs: "The word is",
      youAreImposter: "You are the Imposter!",
      imposterClueLabel: "Category Clue:",
      clueRound: "Clue Round",
      clueInstructions: "Everyone give one-word clues about the Bible word! The Imposter must blend in.\n\nWhen done, proceed to voting.",
      goToVoting: "Go to Voting",
      votingTitle: "Voting Time",
      whoIsImposter: "Who is the Imposter?",
      vote: "Vote",
      resultTitle: "Result",
      theImposterWas: "The Imposter was",
      imposterWins: "Imposter Wins!",
      playersWin: "Players Win!",
      imposterCaught: "The Imposter was caught!",
      imposterSurvived: "The Imposter survived!",
      playAgain: "Play Again",
      imposterGuessed: "Did the Imposter guess the word correctly?",
      yes: "Yes",
      no: "No",
      scoreboard: "Scoreboard",
      imposterScore: "Imposter",
      playersScore: "Players",
    },
    malayalam: {
      appName: "ബൈബിൾ ഇംപോസ്റ്റർ",
      startGame: "കളി തുടങ്ങുക",
      players: "കളിക്കാർ",
      howToPlay: "എങ്ങനെ കളിക്കാം",
      howToPlayText: "1. കളിക്കാരെ തിരഞ്ഞെടുക്കുക.\n2. റോൾ കാണാൻ ഫോൺ കൈമാറുക.\n3. ഇംപോസ്റ്റർ വാക്ക് ഊഹിക്കാൻ ശ്രമിക്കുക.\n4. സൂചനകൾ നൽകുക.\n5. ഇംപോസ്റ്ററെ വോട്ട് ചെയ്ത് പുറത്താക്കുക!",
      close: "അടയ്ക്കുക",
      setupTitle: "കളി സജ്ജീകരണം",
      passPhoneTo: "ഫോൺ കൈമാറുക:",
      player: "കളിക്കാരൻ",
      showRole: "എന്റെ റോൾ കാണുക",
      hideRole: "മറച്ച് അടുത്തതിലേക്ക്",
      yourRole: "നിങ്ങളുടെ റോൾ",
      theWordIs: "വാക്ക് ഇതാണ്:",
      youAreImposter: "നിങ്ങൾ ഇംപോസ്റ്ററാണ്!",
      imposterClueLabel: "വിഭാഗം (സൂചന):",
      clueRound: "സൂചന റൗണ്ട്",
      clueInstructions: "എല്ലാവരും ഓരോ സൂചനകൾ പറയുക! ഇംപോസ്റ്റർ മറ്റുള്ളവരോടൊപ്പം ചേർന്ന് പോവുക.\n\nഅതിനുശേഷം വോട്ടിംഗിലേക്ക് പോവുക.",
      goToVoting: "വോട്ടിംഗിലേക്ക് പോവുക",
      votingTitle: "വോട്ടിംഗ് സമയം",
      whoIsImposter: "ആരാണ് ഇംപോസ്റ്റർ?",
      vote: "വോട്ട് ചെയ്യുക",
      resultTitle: "ഫലം",
      theImposterWas: "ഇംപോസ്റ്റർ ഇതായിരിന്നു:",
      imposterWins: "ഇംപോസ്റ്റർ വിജയിച്ചു!",
      playersWin: "കളിക്കാർ വിജയിച്ചു!",
      imposterCaught: "ഇംപോസ്റ്ററെ പിടിച്ചു!",
      imposterSurvived: "ഇംപോസ്റ്റർ രക്ഷപെട്ടു!",
      playAgain: "വീണ്ടും കളിക്കുക",
      imposterGuessed: "ഇംപോസ്റ്റർ ശരിയായ വാക്ക് ഊഹിച്ചോ?",
      yes: "അതെ",
      no: "ഇല്ല",
      scoreboard: "സ്കോർബോർഡ്",
      imposterScore: "ഇംപോസ്റ്റർ",
      playersScore: "കളിക്കാർ",
    }
  };

  const t = textDict[language];

  const startNewGame = () => {
    const imposter = Math.floor(Math.random() * numPlayers);
    setImposterIndex(imposter);
    
    const wordList = bibleWords;
    const wordIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[wordIndex]);
    
    const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: i,
      name: `${t.player} ${i + 1}`
    }));
    setPlayers(newPlayers);
  };

  const updateScore = (winner) => {
    if (winner === 'imposter') {
      setScore(prev => ({ ...prev, imposter: prev.imposter + 1 }));
    } else {
      setScore(prev => ({ ...prev, players: prev.players + 1 }));
    }
  };

  return (
    <GameContext.Provider value={{
      language, setLanguage,
      numPlayers, setNumPlayers,
      t, startNewGame,
      players, imposterIndex,
      currentWord, score, updateScore
    }}>
      {children}
    </GameContext.Provider>
  );
};
