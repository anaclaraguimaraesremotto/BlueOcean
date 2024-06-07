import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    LoginScreen: undefined;
    CadastroScreen: undefined;
    HomeScreen: undefined;
    ManutencaoScreen: undefined;
    AnaliseScreen: undefined;
  };
type AnaliseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AnaliseScreen'>;

const AnaliseScreen: React.FC = () => {
    const navigation = useNavigation<AnaliseScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.head}>
            
            <Image source={require('../assets/images/blueocean-logo.png')} />
            </View>
            <Text style={styles.title}>|Controle da Região</Text>
            <Text style={styles.label}>Temperatura da Água:</Text>
            <Text style={styles.label}>Turbidez:</Text>
            <Text style={styles.label}>PH:</Text>
            <Text style={styles.label}>Oxigênio Dissolvido (OD):</Text>
            <Text style={styles.label}>Nitrato:</Text>
            <Text style={styles.label}>Fostato:</Text>
            <Text style={styles.label}>Salinidade:</Text>
            <Text style={styles.title}>|Comparativos</Text>
            <Text style={styles.label}>Mês Anterior:</Text>
            <Text style={styles.label}>Mês Seguinte:</Text>
            <Text style={styles.label}>Ultimos 3 meses:</Text>
            <Text style={styles.label}>Ultimos 6 meses:</Text>
            <Text style={styles.label}>Média Anual:</Text>
            <Text style={styles.label}>Média Histórica:</Text>
            
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

export default AnaliseScreen;