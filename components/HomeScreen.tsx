import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGlobalState } from '../hooks/UseGlobalState';

type RootStackParamList = {
  LoginScreen: undefined;
  CadastroScreen: undefined;
  MenuScreen: undefined;
  HomeScreen: undefined;
  ManutencaoScreen: undefined;
  AnaliseScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const { user, home } = useGlobalState();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    if (user) {
      setMessage(`Bem-vindo, ${user.email}`);
    }
  }, [user]);

  const handleSendMessage = () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado.');
      return;
    }

    home(message, user.email)
      .then(() => {
        Alert.alert('Sucesso', 'Mensagem enviada com sucesso');
      })
      .catch((error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        Alert.alert('Erro', `Falha ao enviar mensagem: ${errorMessage}`);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}> 
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuScreen')}>
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
        <Image source={require('../assets/images/blueocean-logo.png')} />
      </View>
      <Text style={styles.title}>|Fórum de notícias</Text>

      <View style={styles.message}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  head: {
    backgroundColor: '#003366',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 26,
    color: '#003366',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 10,
  },
  message: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#d9d9d9',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '70%',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: 'Arial',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#003366',
    borderRadius: 100,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: '12%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  menuButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default HomeScreen;
