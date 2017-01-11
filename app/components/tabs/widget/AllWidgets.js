'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    ToastAndroid,
    ListView
} from 'react-native';
let {height, width} = Dimensions.get('window');
let windowWidth = width;
//import Swipeout from './Swipeout';
import SwipeSimple from './SwipeSimple';
export default class AllWidgets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollEnabled: true,
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'green' }}>
                <Text>组件</Text>
                <ScrollView
                    ref="myScrollView"
                    keyboardDismissMode='on-drag'
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={true}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <SwipeSimple
                            onDisableScroll={() => { } }
                            onEnableScroll={() => { } }
                            onDelete={() => { } }
                            rightWidth={80}
                            >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    height:80,
                                    width: windowWidth,
                                    backgroundColor: 'white'
                                }}>
                                    <Text>ceshi</Text>
                                </View>
                            </View>

                        </SwipeSimple>

                    </View>
                </ScrollView>

            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <Swipeout
                left={rowData.left}
                right={rowData.right}
                rowID={rowID}
                sectionID={sectionID}
                autoClose={rowData.autoClose}
                backgroundColor={rowData.backgroundColor}
                close={!rowData.active}
                onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID)}
                scroll={event => this._allowScroll(event)}>
                <View style={{
                    backgroundColor: '#fff',
                    borderBottomColor: '#eee',
                    borderColor: 'transparent',
                    borderWidth: 1,
                    paddingLeft: 16,
                    paddingTop: 14,
                    paddingBottom: 16,
                }}>
                    <Text style={{
                        color: '#333',
                        fontSize: 16,
                    }}>{rowData.text}</Text>
                </View>
            </Swipeout>
        );
    }
    _handleSwipeout(sectionID, rowID) {
        for (var i = 0; i < rows.length; i++) {
            if (i != rowID) rows[i].active = false;
            else rows[i].active = true;
        }
        this._updateDataSource(rows);
    }

    _updateDataSource(data) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }

}