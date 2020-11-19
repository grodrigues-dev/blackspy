import React, { useState } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';

import { realizarLogin } from '../../services/api';

import Loader from '../../components/Loader';

import AsyncStorage from '@react-native-community/async-storage';

export default function Login({ navigation }) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState('');

    const primeiroAcesso = navigation.getParam('primeiroAcesso');

    const Logar = () => {
        setLoading(true)
        realizarLogin({
            login: usuario,
            senha
        }).then(response => {
            AsyncStorage.setItem('token', response.data.token, () => {
                navigation.navigate('Dashboard');
            });
        }).catch(() => {
            setLoading(false)
            alert('Usuário ou senha inválidos');
        })
    }

    const voltar = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.titulo}>{primeiroAcesso ? "Cadastre-se" : "Login"} </Text>
                <TextInput style={styles.input} autoCapitalize='none' placeholder="Login" value={usuario} onChangeText={(e)=> setUsuario(e)}/>
                <TextInput style={styles.input} autoCapitalize='none' secureTextEntry placeholder="Senha" value={senha} onChangeText={(e)=> setSenha(e) }/>
                <TouchableHighlight style={styles.button} onPress={Logar}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableHighlight>
                <Text onPress={voltar} style={styles.textVoltar}>Voltar</Text>
            </View>
            <Loader  showModal={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        height: 300,
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center', 
        padding: 5
    }, 
    titulo: {
        color: "#FFF", 
        fontSize: 30, 
    }, 
    input: {
        marginTop: 20,
        backgroundColor: "#fff", 
        width: "80%", 
        height: 35, 
        fontSize: 16, 
        padding: 0, 
        paddingLeft: 10
    }, 
    button: {
        marginTop: 25, 
        borderColor: '#fff', 
        borderWidth: 2, 
        borderRadius: 5 ,
        padding: 5,
        width: 160, 
        alignItems: "center",
    },
    textButton: {
        color: '#fff',
        fontSize: 18
    },
    textVoltar: {
        color: '#fff', 
        borderBottomColor: '#fff', 
        borderWidth: 1,
        marginTop: 15
    }
})