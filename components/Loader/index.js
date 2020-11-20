import React from 'react';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    View
} from 'react-native';

export default function Loader(props) {
    const {
        showModal
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={showModal}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={showModal} 
                        size="large" 
                        color="#000"/>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(0, 0, 0, 0.85)'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });