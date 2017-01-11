'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import AFApp from './AFApp';
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  render() {
    if (this.state.isLoading) { 
      return null;
    }
    return(
        <AFApp/>
    );
  }
}



