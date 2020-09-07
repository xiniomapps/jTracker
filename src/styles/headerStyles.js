import { StyleSheet } from 'react-native';
import * as Colors from './colors';

export const headerStyles = StyleSheet.create({
    iconButton: {
        margin: 5,
        minHeight: 48,
        minWidth: 48,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
});