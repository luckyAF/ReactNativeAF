'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "home",
        }
    }

    render() {
        <View style={{ flex: 1, backgroundColor: 'white' }}>       
            <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
            </TabNavigator>
        </View>

    }

    renderTabItem(img, selectedImg, childView, title) {
        return (
            <TabNavigator.Item>
                selected={this.state.selectedTab === tag}
                title={title}
                selectedTitleStyle={}
                renderIcon={}
                renderSelectedIcon={}
                onPress={}>
                {childView}
            </TabNavigator.Item>
        );
    }
    renderChildView(tag) {
        return ();
    }

    setTag(tag) {
        this.state.selectedTab === tag ? return :
        this.setState({
            selectedTab: tag,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});