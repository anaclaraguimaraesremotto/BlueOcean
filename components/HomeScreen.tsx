import React, { useState } from 'react';
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
        <Image source={require('../assets/images/menu.png')}  style={styles.logoHead}/>
        </TouchableOpacity>
        <Image source={require('../assets/images/blueocean-logo.png')}  style={styles.logo}/>
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
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  logoHead:{
    width: 25,
    height: 20,
    resizeMode: 'stretch'
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
  logo: {
    height: 40,
    width: 200,
    resizeMode: 'stretch',
    marginRight:60, 
    marginLeft: 20  
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
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    marginTop: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    
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
