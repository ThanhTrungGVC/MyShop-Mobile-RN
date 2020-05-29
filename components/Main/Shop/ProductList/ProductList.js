import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';

import backList from '../../../../images/appIcon/backList.png';

import productList from '../../../../api/productList';

const url = 'http://192.168.1.239/app-server/images/product/';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      refreshing: false,
      page: 1,
    };
  } 

  goBack() {
    const { navigator } = this.props;
    navigator.pop();
  }
  gotoProductDetails(product) {
    const { navigator } = this.props;
    navigator.push({ name: 'PRODUCTDETAILS', product });
  }
  componentDidMount() {
    const {category} = this.props;
    productList(category.id, 1).then(resJSON => {
      this.setState({productList: resJSON});
    });
  }
  _onRefresh = () => {
    const id = this.props.category.id;
    const newpage = this.state.page + 1;
    productList(id, newpage).then(res => 
      this.setState({
        productList: res.concat(this.state.productList),
        refreshing: true,
      }),
    );
  };

  render() { 
    const {
      container,
      wrapper,
      header,
      backStyle,
      titleStyle,
      productContainer,
      productImage,
      productInfor,
      detailsRow,
      txtName,
      txtPrice,
      txtMaterial, 
      txtColor,
    } = styles;
    const { category } = this.props;
    return (
      <View style={container}>
        <View style={wrapper}>
          <View style={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)}>
              <Image source={backList} style={backStyle} />
            </TouchableOpacity>
            <Text style={titleStyle}>{category.name}</Text>
            <View style={{ width: 30 }} />
          </View>
          <FlatList
            data={this.state.productList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.gotoProductDetails(item)} key={item.id}>
                <View style={productContainer}>
                  <Image 
                    style={productImage} 
                    source={{uri: url + item.images[0]}}/>
                  <View style={productInfor}>
                    <Text style={txtName}>{item.name}</Text>
                    <Text style={txtPrice}>{item.price}€</Text>
                    <Text style={txtMaterial}>{item.material}</Text>
                    <View style={detailsRow}>
                      <Text style={txtColor}>{item.color}</Text>
                      <View style={{ backgroundColor: item.color.toLowerCase(), width: 10, height: 10, borderRadius: 5 }} />
                    </View>
                  </View>
                </View> 
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBD8',
    padding: 10,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  wrapper: {
    backgroundColor: '#fff',
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    paddingHorizontal: 10,
    margin: 10,
  },
  backStyle: {
    width: 30,
    height: 30,
  },
  titleStyle: {
    fontSize: 20,
    color: '#B10D65',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#D6D6D6',
    borderWidth: 1,
    borderLeftColor: '#FFF',
    borderRightColor: '#FFF',
    borderBottomColor: '#FFF',

  },
  productImage: {
    width: 130,
    height: (130 * 452) / 361,
  },
  productInfor: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  txtName: {
    fontSize: 17,
    color: '#9A9A9A',
    fontWeight: '400',
  },
  txtPrice: {
    color: '#B10D65',
  },
  txtMaterial: {
    color: '#5c5c5c',
  },
  txtDetails: {
    color: '#B10D65',
    fontSize: 13,
  },
  txtColor: {
    color: '#5c5c5c',
  },
});