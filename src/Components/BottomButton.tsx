import {LinearGradient} from 'expo-linear-gradient';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
    disable?: boolean;
    buttonText: string;
    onPress: () => any | Promise<any>;
};

export function BottomButton({disable, buttonText, onPress}: Props) {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={disable || pressed}
            onPress={async () => {
                setPressed(true);
                await onPress();
                setPressed(false);
            }}>
            {disable === undefined ? (
                <LinearGradient
                    colors={['#FF6ECE', '#FF3DBD']}
                    style={[styles.updateButton]}>
                    <Text style={styles.updateButtonText}>{buttonText}</Text>
                </LinearGradient>
            ) : !disable ? (
                <LinearGradient
                    colors={['#FF6ECE', '#FF3DBD']}
                    style={[styles.updateButton]}>
                    <Text style={styles.updateButtonText}>{buttonText}</Text>
                </LinearGradient>
            ) : (
                <View style={[styles.updateButton]}>
                    <Text style={styles.updateButtonText}>{buttonText}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    updateButton: {
        marginHorizontal: 16,
        borderRadius: 10,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC7F0',
    },
    updateButtonText: {fontFamily: 'Galmuri11', color: 'white'},
});
