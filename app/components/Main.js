'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
} from 'react-native';

import AFDrawerLayout from './common/AFDrawerLayout';
import MenuItem from './common/MenuItem';
import AllWidgets from './tabs/widget/AllWidgets';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "home",
        }
        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
    }
    render() {
        return (
            <AFDrawerLayout
                ref={(drawer) => { this._drawer = drawer; } }
                drawerWidth={290}
                drawerPosition="left"
                renderNavigationView={this.renderNavigationView}>
                <View style={{flex:1}} key={this.state.tab}>
                    {this.renderContent()}
                </View>
            </AFDrawerLayout>
        );
    }

    onTabSelect(tab) {
        ToastAndroid.show(this.state.tab + " " + tab, ToastAndroid.SHORT);
        if (this.state.tab !== tab) {
            this.setState({
                tab: tab
            });
        }
        if (this._drawer) {
            this._drawer.closeDrawer();
        }
    }

    renderNavigationView() {
        let _this = this;
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: 50,
            }}>
                <MenuItem title={"首页"} onClick={() => _this.onTabSelect("home")} />
                <MenuItem title={"通用"} onClick={() => _this.onTabSelect("common")} />
                <MenuItem title={"组件"} onClick={() => _this.onTabSelect("widget")} />
                <MenuItem title={"Test"} onClick={() => _this.onTabSelect("widget")} />
                <MenuItem title={"组件"} onClick={() => _this.onTabSelect("widget")} />
            </View>
        );

    }


    renderContent() {
        switch (this.state.tab) {
            case "home":
                return <View style={{ flex: 1, backgroundColor: 'yellow' }} />;
            case "widget":
                return <AllWidgets/>;

            case "common":
                return <AllWidgets/>;

            default:
                return <View style={{ flex: 1, backgroundColor: 'white' }} />
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
