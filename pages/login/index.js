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

export default function Login({ navigation }) {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState('');

    const cadastro= navigation.getParam('cadastro'); 

    // const Logar = () => {
    //     setLoading(true)
    //     realizarLogin({
    //         login,
    //         senha
    //     }).then(data => {
    //         if (!data.token) {
    //             setLoading(false)
    //             return alert('Usuário ou senha inválidos');
    //         }
    //         AsyncStorage.setItem('token', data.token, () => {
    //             navigation.navigate('Home');
    //         });
    //     }).catch(() => {
    //         setLoading(false)
    //         alert('Usuário ou senha inválidos');
    //     })
    // }

    return (
        <>
            <Text>Login {cadastro} </Text>
        </>
    )
}