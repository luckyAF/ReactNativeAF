import React from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    ScrollView,
    Easing,
    PanResponder,
    TouchableWithoutFeedback,
} from 'react-native';

let {height, width} = Dimensions.get('window');
let windowWidth = width;
import Swipeout from '../../../widget/Swipeout';
export default class SwipeoutSimple extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
                <ScrollView
                    ref="myScrollView"
                    keyboardDismissMode='on-drag'
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={true}>
                    <Swipeout
                        itemId={1}
                        onDelete={() => { }}
                        rightWidth={80}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                height: 80,
                                width: windowWidth,
                                backgroundColor: 'white'
                            }}>
                                <Text>ceshi</Text>
                            </View>
                        </View>
                    </Swipeout>
                    <Swipeout
                        itemId={1}
                        onDelete={() => { }}
                        rightWidth={80}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                height: 80,
                                width: windowWidth,
                                backgroundColor: 'white'
                            }}>
                                <Text>ceshi</Text>
                            </View>
                        </View>
                    </Swipeout>
                    <Swipeout
                        itemId={1}
                        onDelete={() => { }}
                        rightWidth={80}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                height: 80,
                                width: windowWidth,
                                backgroundColor: 'white'
                            }}>
                                <Text>ceshi</Text>
                            </View>
                        </View>
                    </Swipeout>
                    <Swipeout
                        itemId={1}
                        onDelete={() => { }}
                        rightWidth={80}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                height: 80,
                                width: windowWidth,
                                backgroundColor: 'white'
                            }}>
                                <Text>ceshi</Text>
                            </View>
                        </View>
                    </Swipeout>
                    <Swipeout
                        itemId={1}
                        onDelete={() => { }}
                        rightWidth={80}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                height: 80,
                                width: windowWidth,
                                backgroundColor: 'white'
                            }}>
                                <Text>ceshi</Text>
                            </View>
                        </View>
                    </Swipeout>
                </ScrollView>
            </View>
        );
    }
}
