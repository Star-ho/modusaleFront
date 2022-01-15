import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
       width: SCREEN_WIDTH,
       height: SCREEN_HEIGHT,
     } = Dimensions.get('window');

     // based on iphone 5s's scale
const widthScale = SCREEN_WIDTH / 320;
const heightScale = SCREEN_HEIGHT / 320;

export function fontSizeFlex(size) {
    const newSize = size * widthScale 
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return ( Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2 )
    }
}

export function heightSize(size) {
    const newSize = size * heightScale/2
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return ( Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2 )
    }
}