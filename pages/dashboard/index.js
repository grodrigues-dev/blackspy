import React, { Component } from 'react';

import {
    Text,
    View,
    FlatList,
    Image,
    StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { getServicos } from '../../services/api';

import Loader from '../../components/Loader';

const token = AsyncStorage.getItem('token');
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaAlvos: [],
            loading: true
        }

    }

    getPericulosidade = (nivel) => {
        let perigo;
        switch (nivel) {
            case 'ALTO':
                perigo = {
                    perigo: 'alta',
                    background: '#000'
                }
                break;
            case 'MEDIO':
                perigo = {
                    perigo: 'média',
                    background: '#ff0000'
                }
                break;
            case 'BAIXO':
                perigo = {
                    perigo: 'baixa',
                    background: '#00c21a'
                }
                break;
        }
        return perigo;
    }

    componentDidMount() {
        getServicos(token['_W']).then(response => {
            this.setState({
                listaAlvos: response.data,
                loading: false
            })
        }).catch(e => {
            this.setState({ loading: false })
            alert('Houve um erro ao consultar os alvos');
        })
    }

    formatarData = (data) => {
        return moment(data).format('DD/MM/YYYY');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.txtHeader}>BLACKSPY</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.titulo}>SUSPEITOS PROCURADOS</Text>
                    <FlatList
                        data={this.state.listaAlvos}
                        keyExtractor={(alvo, i) => `${i}`}
                        horizontal
                        renderItem={({ item }) => (
                            <View style={styles.lista}>
                                <Image style={styles.thumbnail} source={{ uri: item.alvo.foto }} />
                                <Text>Nome:{item.alvo.nome}</Text>
                                <Text>Procurado desde: {this.formatarData(item.dataDespacho)}</Text>
                                <Text>Drone {item.drone.alias}</Text>
                                <View style={styles.periculosidade}>
                                    <Text>Periculosidade: </Text>
                                    <Text style={{ backgroundColor: this.getPericulosidade(item.alvo.nivelPericulosidade).background, ...styles.txtPericulosidade }}>
                                        {this.getPericulosidade(item.alvo.nivelPericulosidade).perigo}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <Loader showModal={this.state.loading} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center",
    },
    body: {
        padding: 5
    },
    thumbnail: {
        width: 200,
        height: 200,
        resizeMode: "stretch"
    },
    lista: {
        marginRight: 15
    },
    header: {
        backgroundColor: '#000',
        width: '100%',
        alignItems: 'center',
        padding: 3,
        marginBottom: 15
    },
    txtHeader: {
        color: '#FFF',
        fontSize: 18
    },
    titulo: {
        textAlign: "center",
        color: '#000',
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    periculosidade: {
        flexDirection: 'row'
    },
    txtPericulosidade: {
        width: 80,
        color: '#fff', 
        borderRadius: 5, 
        textAlign: "center", 
        marginLeft: 5
    }

})