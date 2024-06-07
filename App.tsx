import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from './components/LoginScreen';
import { GlobalStateProvider } from "./hooks/UseGlobalState";
import CadastroScreen from "./components/CadastroScreen";
import ManutencaoScreen from "./components/ManutençãoScreen";
import HomeScreen from "./components/HomeScreen";

type RootStackParamList = {
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
          
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}

export default App;
