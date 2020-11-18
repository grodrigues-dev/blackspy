import React, { Component } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';


 
export default class Home extends Component {

    render() {
        return (
            <>
            <Text>Home</Text>
            <Image source={{uri: `https://i.postimg.cc/V5yCFxnb/116837630-3167047800010743-5649935702060817403-n.jpg`}} style={{width: 100, height: 100}}/>
            </>
        )
    }
}