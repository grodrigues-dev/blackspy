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


export default function Home({ navigation }) {

    const navegarParaLogin = (opcao) => {
        navigation.navigate('Login', {
           cadastro: opcao 
        })
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo-blackspy.png')} style={styles.logo} />
            <View style={styles.containerButtons}>
                <TouchableHighlight style={styles.buttons} onPress={()=>navegarParaLogin('login')}>
                    <Text style={styles.textoButtons}>Entrar</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttons} onPress={()=>navegarParaLogin('cadastro')}>
                    <Text style={styles.textoButtons}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: 35
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    buttons: {
        backgroundColor: "#000",
        width: 250,
        height: 30,
        marginTop: 20, 
        display: "flex",
        alignItems: 'center', 
        justifyContent: "center", 
        borderRadius: 5
    },
    textoButtons: {
        color: '#fff',
        fontSize: 18
    }

})