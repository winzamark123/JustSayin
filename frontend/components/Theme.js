import { Dimensions } from 'react-native';

export const colorPalette = {
    mainColor: '#D33F48',
    pinkColor: '#D5808C',
    purpleColor: '#D7C0D0',
    yellowColor: '#F0F0D1',
    lightGreenColor: '#B4D4B5',
    forestGreenColor: '#77BA99',
    blackColor: '#272732',
    whiteColor: '#F6F6F6',
    greyColor: '#7D7D8B'
}



export const fontSize = {
    title: 64,
    large: 24,
    medium: 18,
    small: 12,

}

export const fontFamily = {
    Poppins: "Poppins",
    PoppinsBold: "Poppins-Bold",
    PoppinsSemiBold: "Poppins-SemiBold",

}

const windowWidth = Dimensions.get('window').width;
const scale = windowWidth / 375;

export const normalize = (size) => {
    const newSize = size * scale;

    return Math.round(newSize)

}