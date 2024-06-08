// screens/LoginScreen.js
import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
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

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useGlobalState();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso');
      navigation.navigate('HomeScreen');
    } catch (err) {
      setError('Dados inválidos.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/blueocean-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Seja Bem-Vindo!</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Email"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Senha"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.spacing} />
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.signupText}>
          Novo por aqui?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('CadastroScreen')}>
            Crie uma conta!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003366',
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'arial',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'arial',
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'arial',
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'arial',
  },
  inputError: {
    borderColor: 'red',
  },
  spacing: {
    height: 10,
  },
  buttonArea: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#0066cc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'arial',
  },
  bottomTextContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#ffffff',
    fontFamily: 'arial',
  },
  signupLink: {
    color: '#ff9900',
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
});

export default LoginScreen;
