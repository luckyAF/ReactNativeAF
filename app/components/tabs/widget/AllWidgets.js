'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    ToastAndroid,
    TouchableNativeFeedback,
    ListView
} from 'react-native';
import Touchable from '../../common/Touchable';
import { getNavigator }  from '../../../route';

let {height, width} = Dimensions.get('window');
let windowWidth = width;
var data = [
    { name: 'Swipeout', routeId: 'SwipeoutSimple' },
    { name: 'sortableList', routeId: 'SortableListView' },
];
export default class AllWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
            scrollEnabled: true,
        };
        this.renderCell = this.renderCell.bind(this);

    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'green' }}>
                
                <Text>组件</Text>
                <ListView
                    ref={(ref) => this.mListView = ref}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderCell} />


            </View>
        );
    }

    renderCell(rowData, sectionID, rowID) {
        return (
            <Touchable
                onPress={() => { getNavigator().push({ id: rowData.routeId }) } }>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 15,
                }}>
                    <Text style={{
                        textAlign: 'center',
                    }}>
                        {rowData.name}
                    </Text>
                </View>
            </Touchable>);

    }


}