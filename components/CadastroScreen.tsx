import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroScreen'>;

const CadastroScreen: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [error, setError] = useState('');
  const { cadastro } = useGlobalState();
  const navigation = useNavigation<CadastroScreenNavigationProp>();

  const handleCadastro = async () => {
    if (senha !== confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await cadastro(nomeUsuario, user, email, senha, confirmaSenha);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      navigation.navigate('LoginScreen');
    } catch (err) {
      setError('Erro ao realizar cadastro.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={user}
        onChangeText={setUser}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.loginText}>
          Já possui uma conta?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
            Faça login!
          </Text>
        </Text>
      </View>
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  bottomTextContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#ffffff',
  },
  loginLink: {
    color: '#ff9900',
    fontWeight: 'bold',
  },
});

export default CadastroScreen;
