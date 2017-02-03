'use strict';
import React, { Component } from 'react';
import { getRouteMap, registerNavigator } from './route';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  BackAndroid,
  ToastAndroid,
  Text,
  Platform,
  StatusBar,
  View
} from 'react-native';
let lastClickTime = new Date().getTime();
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handlers = [];
    this.addBackButtonListener = this.addBackButtonListener.bind(this);
    this.removeBackButtonListener = this.removeBackButtonListener.bind(this);
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  addBackButtonListener(listener) {
    this.handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this.handlers = this.handlers.filter((handler) => handler !== listener);
  }

  static childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  }
  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  handleBackButton() {
    for (let i = this.handlers.length - 1; i >= 0; i--) {
      if (this.handlers[i]()) {
        return true;
      }
    }
    const routers = this.navigator.getCurrentRoutes();
    if (routers.length > 1) {
      this.navigator.pop();
      return true;
    }
    let now = new Date().getTime();
    if (now - lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
      return false;//控制权交给原生
    }
    lastClickTime = now;
    ToastAndroid.show('再按一次退出一个', ToastAndroid.SHORT);
    return true;
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor="green"
          barStyle="light-content"
        />

        <Navigator
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            id: 'Splash',
          }} />
      </View>
    );
  }
  renderScene(route, navigator) {
    this.navigator = navigator;
    registerNavigator(navigator);
    //Each component name should start with an uppercase letter
    //jsx中的组件都得是大写字母开头, 否则将报错, expected a component class, got [object Object]
    let Component = getRouteMap().get(route.id).component;
    if (!Component) {
      return (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>您所启动的Component未在routeMap中注册</Text>
        </View>
      );
    }
    return (
      <Component {...route}/>
    );
  }

  //出场动画
  configureScene(route) {
    let sceneAnimation = getRouteMap().get(route.id).sceneAnimation;
    if (sceneAnimation) {
      return sceneAnimation;
    }
    //默认
    return Navigator.SceneConfigs.FloatFromRight;
  }



}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigator: {
    flex: 1,
    backgroundColor: 'white'
  },
  errorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  errorText: {
    color: 'red',
    fontSize: 16
  }

});