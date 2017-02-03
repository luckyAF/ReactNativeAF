// 'use strict';
// import React, { PropTypes, Component } from 'react';
// import {
//     View,
//     PanResponder,
//     StyleSheet,
//     Text,
//     Easing,
//     Animated
// } from 'react-native';
// import tweenState from 'react-tween-state';
// import Touchable from '../../common/Touchable';

// export default class Swipeout extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             autoClose: this.props.autoClose || false,
//             btnWidth: 0,
//             btnsLeftWidth: 0,
//             btnsRightWidth: 0,
//             contentHeight: 0,
//             contentPos: 0,
//             contentWidth: 0,
//             openedRight: false,
//             swiping: false,
//             tweenDuration: 160,
//             timeStart: null,
//         }
//         this.onLayout = this.onLayout.bind(this);
//         this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
//         this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
//         this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
//         this.tweenContent = this.tweenContent.bind(this);
//     }
//     propTypes = {
//         autoClose: PropTypes.bool,
//         backgroundColor: PropTypes.string,
//         close: PropTypes.bool,
//         onOpen: PropTypes.bool,
//         left: PropTypes.array,
//         right: PropTypes.array,
//         scroll: PropTypes.func,
//         style: View.propTypes.style,
//         secsitivity: PropTypes.number,
//     }
//     static defaultProps = {
//         rowID: -1,
//         sectionID: -1,
//         sensitivity: 0,
//     }

//     componentWillMount() {
//         this.panResponder = PanResponder.create({
//             onStartShouldSetPanResponder: (event, gestureState) => true,
//             onMoveShouldSetPanResponder: (event, gestureState) =>
//                 Math.abs(gestureState.dx) > this.props.sensitivity &&
//                 Math.abs(gestureState.dy) > this.props.sensitivity,
//             onPanResponderGrant: this.handlePanResponderGrant,
//             onPanResponderMove: this.handlePanResponderMove,
//             onPanResponderRelease: this.handlePanResponderEnd,
//             onPanResponderTerminate: this.handlePanResponderEnd,
//             onShouldBlockNativeResponder: (event, gestureState) => true,
//         });
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.close) this.close();
//     }

//     handlePanResponderGrant(e, gestureState) {
//         let _this = this;
//         if (this.props.onOpen) {
//             this.props.onOpen(this.props.sectionID, this.props.rowId);
//         }
//         if (_this.swipeoutContent) {
//             setTimeout(_this.swipeoutContent.measure((ox, oy, width, height) => {
//                 _this.setState({
//                     btnWidth: (width / 5),
//                     btnsLeftWidth: _this.props.left ? (width / 5) * _this.props.left.length : 0,
//                     btnRightWidth: _this.prosp.right ? (width / 5) * _this.prosp.right.length : 0,
//                     swiping: true,
//                     timeStart: (new Date()).getTime(),
//                 });
//             }));
//         }
//     }

//     handlePanResponderMove(e, gestureState) {
//         let posX = gestureState.dx;
//         let posY = gestureState.dy;
//         let leftWidth = this.state.btnsLeftWidth;
//         let rightWidth = this.state.btnsRightWidth;
//         if (this.state.openedRight) posX = gestureState.dx - rightWidth;
//         else if (this.state.openedLeft) posX = gestureState.dx + leftWidth;

//         //  prevent scroll if moveX is true
//         let moveX = Math.abs(posX) > Math.abs(posY);
//         if (this.props.scroll) {
//             if (moveX) {
//                 this.props.scroll(false);
//             }
//             else {
//                 this.props.scroll(true);
//             }
//         }
//         if (this.state.swiping) {
//             //  move content to reveal swipeout
//             if (posX < 0 && this.props.right) {
//                 this.setState({ contentPos: Math.min(posX, 0) });
//             }
//             else if (posX > 0 && this.props.left) {
//                 this.setState({ contentPos: Math.max(posX, 0) });
//             }
//         }
//     }
//     handlePanResponderEnd(e, gestureState) {
//         let posX = gestureState.dx;
//         let contentPos = this.state.contentPos;
//         let contentWidth = this.state.contentWidth;
//         let btnsLeftWidth = this.state.btnsLeftWidth;
//         let btnsRightWidth = this.state.btnsRightWidth;

//         //  minimum threshold to open swipeout
//         let openX = contentWidth * 0.33;

//         //  should open swipeout
//         let openLeft = posX > openX || posX > btnsLeftWidth / 2;
//         let openRight = posX < -openX || posX < -btnsRightWidth / 2;

//         //  account for open swipeouts
//         if (this.state.openedRight) openRight = posX - openX < -openX;
//         if (this.state.openedLeft) openLeft = posX + openX > openX;

//         //  reveal swipeout on quick swipe
//         let timeDiff = (new Date()).getTime() - this.state.timeStart < 200;
//         if (timeDiff) {
//             openRight = posX < -openX / 10 && !this.state.openedLeft;
//             openLeft = posX > openX / 10 && !this.state.openedRight;
//         }

//         if (this.state.swiping) {
//             if (openRight && contentPos < 0 && posX < 0) {
//                 // open swipeout right
//                 this.tweenContent('contentPos', -btnsRightWidth);
//                 this.setState({ contentPos: -btnsRightWidth, openedLeft: false, openedRight: true });
//             } else if (openLeft && contentPos > 0 && posX > 0) {
//                 // open swipeout left
//                 this.tweenContent('contentPos', btnsLeftWidth);
//                 this.setState({ contentPos: btnsLeftWidth, openedLeft: true, openedRight: false });
//             }
//             else {
//                 // close swipeout
//                 this.tweenContent('contentPos', 0);
//                 this.setState({ contentPos: 0, openedLeft: false, openedRight: false });
//             }
//         }

//         //  Allow scroll
//         if (this.props.scroll) {
//             this.props.scroll(true);
//         }
//     }

//     tweenContent(state, endValue) {
//         // Animated.timing(this.state.contentPos, {
//         //     easing: Easing.linear,
//         //     duaration: endValue === 0 ? this.state.tweenDuration * 1.5 : this.state.tweenDuration,
//         //     toValue: endValue,
//         // }).start();
//     }

//     rubberBandEasing(value, limit) {
//         if (value < 0 && value < limit) {
//             return limit - Math.pow(limit - value, 0.85);
//         } else if (value > 0 && value > limit) {
//             return limit + Math.pow(value - limit, 0.85);
//         } else {
//             return value;
//         }
//     }

//     autoClose(btn) {
//         let onPress = btn.onPress;
//         if (onPress) {
//             onPress();
//         }
//         if (this.state.autoClose) {
//             this.close();
//         }
//     }

//     close() {
//         this.tweenContent('contentPos', 0);
//         this.setState({
//             openedRight: false,
//             openedLeft: false,
//         });
//     }

//     render() {
//         let _this = this;
//         let contentWidth = this.state.contentWidth;
//         let posX = this.state.contentPos;

//         let styleSwipeout = [styles.swipeout, this.props.style];
//         if (this.props.backgroundColor) {
//             styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }]);
//         }

//         let limit = -this.state.btnsRightWidth;
//         if (posX > 0) limit = this.state.btnsLeftWidth;

//         let styleLeftPos = {
//             left: {
//                 left: 0,
//                 overflow: 'hidden',
//                 width: Math.min(limit * (posX / limit), limit),
//             },
//         };
//         let styleRightPos = {
//             right: {
//                 left: Math.abs(contentWidth + Math.max(limit, posX)),
//                 right: 0,
//             },
//         };
//         let styleContentPos = {
//             content: {
//                 left: this.rubberBandEasing(posX, limit),
//             },
//         };

//         let styleContent = [styles.swipeoutContent];
//         styleContent.push(styleContentPos.content);

//         let styleRight = [styles.swipeoutBtns];
//         styleRight.push(styleRightPos.right);

//         let styleLeft = [styles.swipeoutBtns];
//         styleLeft.push(styleLeftPos.left);

//         let isRightVisible = posX < 0;
//         let isLeftVisible = posX > 0;

//         return (
//             <View style={styleSwipeout}>
//                 <View
//                     ref={(ref) => { _this.swipeoutContent = ref } }
//                     style={styleContent}
//                     onLayout={this.onLayout}
//                     {...this.panResponder.panHandlers}>
//                     {this.props.children}
//                 </View>
//                 {this.renderButtons(this.props.right, isRightVisible, styleRight)}
//                 {this.renderButtons(this.props.left, isLeftVisible, styleLeft)}
//             </View>
//         );
//     }

//     onLayout(event) {
//         var { width, height } = event.nativeEvent.layout;
//         this.setState({
//             contentWidth: width,
//             contentHeight: height,
//         });
//     }

//     renderButtons(buttons, isVisible, style) {
//         if (buttons && isVisible) {
//             return (<View style={style}>
//                 {buttons.map(this.renderButton)}
//             </View>);
//         } else {
//             return (
//                 <View />
//             );
//         }
//     }

//     renderButton(btn, i) {
//         return (
//             <SwipeoutBtn
//                 backgroundColor={btn.backgroundColor}
//                 color={btn.color}
//                 component={btn.component}
//                 disabled={btn.disabled}
//                 height={this.state.contentHeight}
//                 key={i}
//                 onPress={() => this.autoClose(btn)}
//                 text={btn.text}
//                 type={btn.type}
//                 underlayColor={btn.underlayColor}
//                 width={this.state.btnWidth} />
//         );
//     }

// }

// class SwipeoutBtn extends Component {
//     static defaultProps = {
//         backgroundColor: null,
//         color: null,
//         component: null,
//         underlayColor: null,
//         height: 0,
//         key: null,
//         onPress: null,
//         disabled: false,
//         text: 'Click me',
//         type: '',
//         width: 0,
//     }
//     static propTypes = {
//         backgroundColor: PropTypes.string,
//         color: PropTypes.string,
//         component: PropTypes.node,
//         onPress: PropTypes.func,
//         text: PropTypes.string,
//         type: PropTypes.string,
//         underlayColor: PropTypes.string,
//     }

//     render() {
//         let btn = this.props;
//         let styleSwipeoutBtn = [styles.swipeoutBtn];
//         if (btn.type === 'delete') {
//             styleSwipeoutBtn.push(styles.colorDelete);
//         } else if (btn.type === 'primary') {
//             styleSwipeoutBtn.push(styles.colorPrimary);
//         } else if (btn.type === 'secondary') {
//             styleSwipeoutBtn.push(styles.colorSecondary);
//         }
//         if (btn.backgroundColor) {
//             styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }]);
//         }
//         styleSwipeoutBtn.push([{
//             height: btn.height,
//             width: btn.width,
//         }]);
//         let stylesSwipeoutBtnComponent = [];
//         stylesSwipeoutBtnComponent.push([{
//             height: btn.height,
//             width: btn.width,
//         }]);
//         let stylesSwipeoutBtnText = [styles.swipeoutBtnText];
//         if (btn.color) {
//             stylesSwipeoutBtnText.push([{ color: btn.color }]);
//         }
//         return (
//             <Touchable
//                 onPress={this.props.onPress}
//                 style={styles.swipeoutBtnTouchable}
//                 underlayColor={this.props.underlayColor}
//                 disabled={this.props.disabled}
//                 textStyle={stylesSwipeoutBtnText}>
//                 {
//                     (btn.component ?
//                         <View style={stylesSwipeoutBtnComponent}>{btn.component}</View>
//                         :
//                         btn.text
//                     )
//                 }
//             </Touchable>
//         );
//     }

// }


// const styles = StyleSheet.create({
//     swipeoutBtnTouchable: {
//         flex: 1,
//     },
//     swipeoutBtn: {
//         alignItems: 'center',
//         backgroundColor: '#b6bec0',
//         flex: 1,
//         justifyContent: 'center',
//         overflow: 'hidden',
//     },
//     colorDelete: {
//         backgroundColor: '#fb3d38',
//     },
//     colorPrimary: {
//         backgroundColor: '#006fff'
//     },
//     colorSecondary: {
//         backgroundColor: '#fd9427'
//     },
//     swipeoutBtnText: {
//         color: '#fff',
//         textAlign: 'center',
//     },
// });