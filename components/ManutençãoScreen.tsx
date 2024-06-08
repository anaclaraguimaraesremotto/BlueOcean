import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    LoginScreen: undefined;
    CadastroScreen: undefined;
    HomeScreen: undefined;
    ManutencaoScreen: undefined;
    AnaliseScreen: undefined;
  };
type ManutencaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManutencaoScreen'>;

const ManutencaoScreen: React.FC = () => {
    const navigation = useNavigation<ManutencaoScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.head}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuScreen')}>
        <Image source={require('../assets/images/menu.png')}  style={styles.logoHead}/>
        </TouchableOpacity>
        <Image source={require('../assets/images/blueocean-logo.png')}  style={styles.logo}/>
      </View>
      <Text style={styles.title}>| Fórum de Notícias</Text>
            <Text style={styles.title}>|Controle de Manuteção</Text>
            <Text style={styles.label}>Câmera IV:</Text>
            <Text style={styles.label}>Sensores:</Text>
            <Text style={styles.label}>Saúde da Bateria:</Text>
            <Text style={styles.label}>Status do GPS:</Text>
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
    menuButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        
      },
      
    menuButtonText: {
        color: '#ffffff',
        fontSize: 16,
      },
      logoHead:{
        width: 25,
        height: 20,
        resizeMode: 'stretch'
      },
      
      logo: {
        height: 40,
        width: 200,
        resizeMode: 'stretch',
        marginRight:60, 
        marginLeft: 20  
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
    label: {
        fontSize: 18,
        color: '#000000',
        marginBottom: 5,
        marginLeft: 30,
        fontFamily: 'arial',
        justifyContent: 'flex-start',
        fontWeight:'bold'
    },
});

export default ManutencaoScreen;