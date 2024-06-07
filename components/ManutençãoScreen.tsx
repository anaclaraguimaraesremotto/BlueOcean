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
            <Image source={require('../assets/images/blueocean-logo.png')} />
            </View>
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
        backgroundColor: '#ffffff',
        flex: 1,
        width: '100%',
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
        marginLeft: 30,
        fontFamily: 'arial',
        justifyContent: 'flex-start',
        fontWeight:'bold'
    },
});

export default ManutencaoScreen;