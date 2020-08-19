import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';

const { width, } = Dimensions.get('window');

/**
 * Normalize size depending on screen size
 * @param {size} size
 */
export function nm(size) {
    // Iphone 5 reference
    const scale = width / 320;
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

export const globalStyles = StyleSheet.create({
    textButton: {
    },

    textButtonTitle: {
        fontWeight: 'bold',
    },
});