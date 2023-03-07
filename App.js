import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './src/components/Header.js';
import StartGame from './src/screens/StartGame.js';
import GameScreen from './src/screens/GameScreen.js';
import GameOver from './src/screens/GameOver.js';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'; 
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0)
  

 
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });


  
  React.useEffect(() =>{
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

  }, [fontsLoaded])





  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  }

  let content = <StartGame startGameHandler={startGameHandler}/>

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber}
                          gameOverHandler={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOver NOfRounds={guessRounds}
                        rightNumber={userNumber}
                        configureNewGame={configureNewGame} />
  }

  return (
    <SafeAreaView style={styles.screen}>
       <Header title="Adivina el número" />
      {content} 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
