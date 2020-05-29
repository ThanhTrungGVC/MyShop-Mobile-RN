import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, FlatList
} from 'react-native';
import backSpecial from '../../images/appIcon/backs.png';

import getToken from '../../api/getToken';
import orderHistory from '../../api/orderHistory';

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { arrOrder: [] };
  }
  componentDidMount() {
    getToken()
      .then(token => orderHistory(token))
      .then(arrOrder => { this.setState({ arrOrder: arrOrder }, console.log(arrOrder)) });
  }
  render() {
    const { wrapper, header, headerTitle, backIconStyle, body, orderRow } = styles;
    return (
      <View style={wrapper}>
        <View style={header}>
          <View />
          <Text style={headerTitle}>Order History</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MAIN')}>
            <Image source={backSpecial} style={backIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={body}>
          <FlatList
            data={this.state.arrOrder}
            renderItem={({ item }) => (
              <View style={orderRow}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Order id:</Text>
                  <Text style={{ color: '#437777' }}>{item.id}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>OrderTime:</Text>
                  <Text style={{ color: '#C21C70' }}>{item.date_order}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Status:</Text>
                  <Text style={{ color: '#437777' }}>{item.status ? 'Completed' : 'Pending'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Total:</Text>
                  <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{item.total}€</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
/*
*/

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  header: {
    flex: 1,
    backgroundColor: '#437777',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: height / 5,
  },// eslint-disable-line
  headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
  backIconStyle: { width: 30, height: 30 },
  body: { flex: 10, backgroundColor: '#F6F6F6' },
  orderRow: {
    height: width / 3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around'
  }
});