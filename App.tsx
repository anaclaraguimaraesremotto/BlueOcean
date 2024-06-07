import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStateProvider } from './hooks/UseGlobalState';
import LoginScreen from './components/LoginScreen';
import CadastroScreen from './components/CadastroScreen';
import MenuScreen from './components/MenuScreen';
import HomeScreen from './components/HomeScreen';
import AnaliseScreen from './components/AnaliseScreen';
import ManutencaoScreen from './components/ManutençãoScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ManutencaoScreen" component={ManutencaoScreen} />
          <Stack.Screen name="AnaliseScreen" component={AnaliseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
};

export default App;
