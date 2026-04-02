import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './src/contexts/GameContext';

import HomeScreen from './src/screens/HomeScreen';
import RoleScreen from './src/screens/RoleScreen';
import ClueScreen from './src/screens/ClueScreen';
import VotingScreen from './src/screens/VotingScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Role" component={RoleScreen} />
            <Stack.Screen name="Clue" component={ClueScreen} />
            <Stack.Screen name="Voting" component={VotingScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </SafeAreaProvider>
  );
}
