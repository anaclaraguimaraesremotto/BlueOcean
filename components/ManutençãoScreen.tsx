import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  LoginScreen: undefined;
  ManutencaoScreen: undefined;
};
type ManutencaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManutencaoScreen'>;

const ManutencaoScreen: React.FC = () => {
    const navigation = useNavigation<ManutencaoScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.head}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('LoginScreen')}>
                <View style={styles.backButtonCircle}>
                    <Text style={styles.backButtonText}>{"<"}</Text>
                </View>
            </TouchableOpacity>
            <Image source={require('../assets/images/blueocean-logo.png')} />
            </View>

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
    backButton: {
        position: 'absolute',
        top: 25,
        left: 20,
    },
    backButtonCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 30,
        color: '#ffffff',
        fontFamily: 'arial',
        fontWeight: 'bold'
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
});

export default ManutencaoScreen;