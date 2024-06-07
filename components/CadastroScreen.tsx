import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGlobalState } from '../hooks/UseGlobalState';

type RootStackParamList = {
  LoginScreen: undefined;
  CadastroScreen: undefined;
};

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroScreen'>;

const CadastroScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { cadastro } = useGlobalState();
  const navigation = useNavigation<CadastroScreenNavigationProp>();

  const handleCadastro = async () => {
    if (!name || !user || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await cadastro(name, user, email, password, confirmPassword);
      Alert.alert('Sucesso', 'Registro realizado com sucesso');
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Erro', 'Falha no registro. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('LoginScreen')}>
        <View style={styles.backButtonCircle}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </View>
      </TouchableOpacity>
      <Image source={require('../assets/images/blueocean-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Criar Conta</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={user}
        onChangeText={setUser}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha novamente"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.spacing} />
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
          <Text style={styles.cadastroButtonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.signupText}>
          Já possui uma conta?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('LoginScreen')}>
            Faça login.
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Raleway-Bold',
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
  spacing: {
    height: 10,
  },
  buttonArea: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  cadastroButton: {
    backgroundColor: '#376BA0',
    borderRadius: 10,
    height: 50,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cadastroButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'arial',
  },
  signupLink: {
    fontSize: 14,
    color: '#ffffff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
});

export default CadastroScreen;
