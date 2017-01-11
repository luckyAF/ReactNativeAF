'use strict';
import React from 'react';
import ReactNative, { StyleSheet, Dimensions } from 'react-native';

const scale = Dimensions.get('window').width / 375;
const fontSizeBase = 15;
export default class AFText {
    static normalsize(size: number) {
        return scale * size;
    }
    static fontSizeH1() {
        return scale * fontSizeBase * 1.8;
    }
    static fontSizeH2() {
        return scale * fontSizeBase * 1.6;
    }
    static fontSizeH3() {
        return scale * fontSizeBase * 1.4;
    }
    static fontSizeH1() {
        return scale * fontSizeBase * 1.2;
    }
}



