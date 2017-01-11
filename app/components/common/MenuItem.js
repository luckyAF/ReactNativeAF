'use strict';
import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import Touchable from './Touchable';
import AFText from '../../util/AFText';
export default class MenuItem extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let _this = this;
        return (
            <Touchable
                onPress={_this.props.onClick}>
                <View style={{ flex: 1, }}>
                    <Text style={{
                        fontSize: AFText.fontSizeH1(),
                        textAlign: 'center',
                    }}>
                        {_this.props.title}
                    </Text>
                </View>
            </Touchable>);
    }
}