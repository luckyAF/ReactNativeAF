'use strict';
import {
  Navigator,
} from 'react-native';
import Main from './components/Main';
import Splash from './components/Splash';
import Test from './components/test/test';
import SwipeoutSimple from './components/tabs/widget/SwipeoutSimple';
// Navigator.SceneConfigs.
// PushFromRight
// PushFromLeft
// FloatFromRight
// FloatFromLeft
// FloatFromBottom
// FloatFromBottomAndroid
// FadeAndroid
// HorizontalSwipeJump
// HorizontalSwipeJumpFromRight
// VerticalUpSwipeJump
// VerticalDownSwipeJump

let navigator;

const routeMap = new Map();
//在此注册新页面
routeMap.set('Main', {
  component: Main
});
routeMap.set('Splash', {
  component: Splash,
  sceneAnimation: Navigator.SceneConfigs.FadeAndroid
});
routeMap.set('test', {
  component: Test,
  sceneAnimation: Navigator.SceneConfigs.FadeAndroid
});

routeMap.set('SwipeoutSimple', {
  component: SwipeoutSimple,
  sceneAnimation: Navigator.SceneConfigs.FadeAndroid
});


export function registerNavigator(tempNavigator) {
  if (navigator) {
    return;
  }
  navigator = tempNavigator;
}

export function getNavigator() {
  return navigator;
}

export function getRouteMap() {
  return routeMap;
}
