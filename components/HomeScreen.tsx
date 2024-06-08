import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from '../hooks/UseGlobalState';

const HomeScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const { user, home, messages } = useGlobalState();
  const navigation = useNavigation();

  const handleSendMessage = () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado.');
      return;
    }

    home(message, user.email)
      .then(() => {
        setMessage('');
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
      <Text style={styles.title}>| Fórum de Notícias</Text>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.mensagem}</Text>
            <Text style={styles.cardUser}>- {item.user}</Text>
          </View>
        )}
      />
      <View style={styles.messageInputContainer}>
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
  messageInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
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
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardUser: {
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
  },
});

export default HomeScreen;
