import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MenuScreen'>;

const MenuScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const { user, menu } = useGlobalState();
  const navigation = useNavigation<MenuScreenNavigationProp>();

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

    menu('Mensagem de teste', user.email)
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
      <Text style={styles.title}>{message || 'Bem-vindo!'}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText}>Enviar Mensagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManutencaoScreen')}>
        <Text style={styles.buttonText}>Manutenção</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AnaliseScreen')}>
        <Text style={styles.buttonText}>Análise</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default MenuScreen;
