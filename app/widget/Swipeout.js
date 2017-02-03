import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    Dimensions,
    Animated,
    Easing,
    PanResponder,
    TouchableWithoutFeedback,
} from 'react-native';

let {height, width} = Dimensions.get('window');
let windowWidth = width;

export default class Swipeout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(0),
            contentHeight: 0,
        };
        this.closeItem = this.closeItem.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onLayout = this.onLayout.bind(this)
        this.isOpen = false;
        this.touchValue = 0;;
    }
    componentWillMount() {
        this.beginWidth = windowWidth;
        this.xForRigth = 0;
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
            onPanResponderGrant: (e, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // gestureState.{x,y}0 现在会被设置为0
                this.xForRigth = gestureState.moveX;
                this.beginWidth = this.beginWidth - (this.beginWidth - gestureState.moveX);

            },

            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
                let position;
                if (this.isOpen) {
                    //position = Math.max(gestureState.moveX - this.props.rightWidth, -this.props.rightWidth);
                    position = gestureState.moveX - this.beginWidth - this.props.rightWidth;
                } else {
                    //position = Math.max(gestureState.moveX - this.beginWidth, -this.props.rightWidth);
                    position = gestureState.moveX - this.beginWidth;
                }
                this.state.animatedValue.setValue(Math.min(position, 0));
                this.touchValue = Math.min(position, 0);
                //  }

            },

            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成
                if (this.touchValue < -this.props.rightWidth * 0.75) {

                    // this.state.animatedValue.setValue(-this.props.rightWidth);
                    // this.touchValue = -this.props.rightWidth;
                    // this.isOpen = true;
                    Animated.timing(this.state.animatedValue, {
                        toValue: -this.props.rightWidth,
                        duration: 300,
                        easing: Easing.linear
                    }).start();
                    this.isOpen = true
                    this.touchValue = -this.props.rightWidth;

                } else {
                    this.closeItem();
                    this.isOpen = false;
                }

            },

            onPanResponderTerminate: () => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
                this.closeItem();
            }
        });
    }

    onLayout(event) {
        let { width, height } = event.nativeEvent.layout;
        console.warn(height);
        this.setState({
            contentHeight: height,
        })
    }

    closeItem() {
        Animated.timing(this.state.animatedValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start();
        this.touchValue = 0;
    }

    onClickDelete() {
        if (this.isOpen) {
            this.closeItem();
        }
    }


    static propTypes = {
        onDelete: React.PropTypes.func.isRequired,
        itemId: React.PropTypes.number.isRequired,
    };

    render() {
        let _this = this;
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: this.props.rightWidth,
                    height: this.state.contentHeight,
                    backgroundColor: 'red',

                }}>
                    <TouchableWithoutFeedback
                        onPress={_this.onClickDelete}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'

                        }}>
                            <Text>删除</Text>
                        </View>

                    </TouchableWithoutFeedback>
                </View>
                <Animated.View
                    style={[
                        {
                            transform: [
                                { translateX: this.state.animatedValue },
                            ],
                            flex: 1,
                            flexDirection: 'row',
                        }
                    ]}
                    {...this.panResponder.panHandlers}>
                    <View
                        onLayout={_this.onLayout}
                        >
                        {this.props.children}
                    </View>

                </Animated.View>

            </View>
        );
    }
}