import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGlobalState } from '../hooks/UseGlobalState';

type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const { home } = useGlobalState();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleCHome = async () => {
    if (!message.trim()) {
      alert('Por favor, insira uma mensagem.');
      return;
    }
    try {
      await home(message, 'username'); // Substitua 'username' pelo nome do usuário logado
      setMessage('');
      alert('Mensagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require('../assets/images/blueocean-logo.png')}  />
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

        <TouchableOpacity style={styles.button} onPress={handleCHome}>
            <Text style={styles.buttonText}>ok</Text>
        </TouchableOpacity>
      </View>   
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        width: '100%',
        minHeight: '100%',
    },
    head: {
        backgroundColor: '#003366',
        width: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 26,
        color: '#003366',
        fontWeight: 'bold',
        fontFamily: 'arial',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: '#000000',
        marginBottom: 5,
        marginLeft: 10,
        fontFamily: 'arial',
        justifyContent: 'flex-start',
        fontWeight:'bold'
    }, 
    message: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
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
        marginBottom: 15,
        marginTop: 4,
        fontFamily: 'Arial',
        marginRight: 20
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
});

export default HomeScreen;
