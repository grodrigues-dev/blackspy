import React, { Component } from 'react';

import {
    Text,
    View,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TextInput
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import moment, { RFC_2822 } from 'moment';
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';

import { getServicos } from '../../services/api';
import Loader from '../../components/Loader';

import Camera from '../../assets/camera.png';

const token = AsyncStorage.getItem('token');
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaAlvos: [],
            loading: true,
            imagem: '',
            periculosidade: '', 
            nomeSuspeito: ''
        }

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


    formatarData = (data) => {
        return moment(data).format('DD/MM/YYYY');
    }

    enviarFoto = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Selecione a foto do suspeito' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
        ImagePicker.launchImageLibrary(options, response => {
            this.setState({
                cadastrado: true,
                imagem: response.uri
            })
        })
    }

    cadastrarSupeito = () => {
        this.setState({
            loading: true
        })
        setTimeout(()=> {
            const novoSuspeito = {
                alvo: {
                    foto: this.state.imagem, 
                    nome: this.state.nomeSuspeito, 
                    nivelPericulosidade: this.state.periculosidade
                }, 
                dataDespacho: new Date().toISOString(),
                drone: {
                    alias: 'DRO_MNT_02'
                }
            }
            this.setState({
                listaAlvos: [
                    novoSuspeito,
                    ...this.state.listaAlvos
                ]
            });
            this.setState({
                imagem: '', 
                nomeSuspeito: '', 
                periculosidade: '', 
                loading : false
            })
        }, 4000)
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.txtHeader}>BLACKSPY</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.titulo}>SUSPEITOS PROCURADOS</Text>
                    <FlatList
                        data={this.state.listaAlvos}
                        keyExtractor={(alvo, i) => `${i}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.lista}>
                                <Image style={styles.thumbnail} source={{ uri: item.alvo.foto }} />
                                <Text>Nome:{item.alvo.nome}</Text>
                                <Text>Procurado desde: {this.formatarData(item.dataDespacho)}</Text>
                                <Text>Drone: {item.drone.alias}</Text>
                                <View style={styles.periculosidade}>
                                    <Text>Periculosidade: </Text>
                                    <Text style={{ backgroundColor: this.getPericulosidade(item.alvo.nivelPericulosidade).background, ...styles.txtPericulosidade }}>
                                        {this.getPericulosidade(item.alvo.nivelPericulosidade).perigo}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                    <View style={styles.formulario}>
                        <Text style={styles.tituloForm}>CADASTRAR NOVO ALVO</Text>
                        <TextInput style={styles.txtInput} value={this.state.nomeSuspeito} onChangeText={e => this.setState({nomeSuspeito: e})} placeholder="Nome do suspeito" />
                        <View style={styles.select}>
                            <RNPickerSelect
                                onValueChange={(value) => this.setState({ periculosidade: value })}
                                placeholder={{ label: 'Nível de periculosidade', value: this.state.periculosidade }}
                                value={this.state.periculosidade}
                                items={[
                                    { label: 'Baixo', value: 'BAIXO' },
                                    { label: 'Médio', value: 'MEDIO' },
                                    { label: 'Alto', value: 'ALTO' },
                                ]}
                            />
                        </View>
                        <ImageBackground style={styles.inputImagem} source={{ uri: this.state.imagem.length > 0 ? this.state.imagem : undefined }}>
                            <TouchableHighlight style={styles.btnCamera} onPress={this.enviarFoto}>
                                <Image style={{ width: 50, height: 50 }} source={Camera} />
                            </TouchableHighlight>
                        </ImageBackground>
                        <TouchableHighlight style={styles.btnCadastrar} onPress={this.cadastrarSupeito}>
                            <Text style={styles.txtBtnCadastrar}>Enviar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <Loader showModal={this.state.loading} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        padding: 5,
    },
    formulario: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 5,
        alignItems: "center",
    },
    thumbnail: {
        width: 200,
        height: 200,
        resizeMode: "stretch"
    },
    lista: {
        marginRight: 15,
        height: 300,
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
    },
    tituloForm: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    txtInput: {
        backgroundColor: '#fff',
        marginTop: 20,
        width: '80%',
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
        height: 40
    },
    select: {
        width: '80%',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 40
    },
    inputImagem: {
        backgroundColor: '#fff',
        width: 180,
        height: 120,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
        justifyContent: 'center'
    },
    btnCamera: {
        padding: 10,
        borderColor: '#c4c4c4',
        borderStyle: "dotted",
        borderWidth: 1,
        borderRadius: 5,
    },
    btnCadastrar: {
        marginTop: 20, 
        width: 150, 
        height: 30, 
        backgroundColor: '#ff0303',
        borderRadius: 5
    },
    txtBtnCadastrar: {
        color: '#fff', 
        fontSize: 18, 
        fontWeight: "bold",
        textAlign: "center"
    }
})