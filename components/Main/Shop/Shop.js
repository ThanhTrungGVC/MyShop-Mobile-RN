//React-native
import React from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
//Components
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Header from './Header';
import global from '../../global';
//API
import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';
//Icons
import homeIconS from '../../../images/appIcon/home.png';
import homeIcon0 from '../../../images/appIcon/home0.png';
import cartIconS from '../../../images/appIcon/cart.png';
import cartIcon0 from '../../../images/appIcon/cart0.png';
import searchIconS from '../../../images/appIcon/search.png';
import searchIcon0 from '../../../images/appIcon/search0.png';
import contactIconS from '../../../images/appIcon/contact.png';
import contactIcon0 from '../../../images/appIcon/contact0.png';


export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      types: [],
      topProducts: [],
      cartArray: [],
    };
    global.addProductToCart = this.addProductToCart.bind(this);
    global.incrQuantity = this.incrQuantity.bind(this);
    global.decrQuantity = this.decrQuantity.bind(this);
    global.removeItem = this.removeItem.bind(this);
    global.goToSearch = this.goToSearch.bind(this);
  }
  goToSearch() {
    this.setState({selectedTab: 'search'});
  }

  componentDidMount() {
    initData().then(resJSON => {
      const {type, product} = resJSON; 
      this.setState({types: type, topProducts: product});
      console.log(resJSON)
    });
    getCart()
    .then(cartArray => this.setState({cartArray}));
  }

  /*componentDidMount() {
    fetch('http://localhost/api/')
    .then(res => res.json())
    .then(resJSON => console.log(resJSON));
  }*/


  alertDuplicated(id) {
    Alert.alert(
      'NOTICE',
      'This product is already exist in cart. Do you want to add more?',
      [{text: 'OK', onPress: this.incrQuantity(id)}],
      {cancelable: false},
    );
  }

  addProductToCart(product) {
    const isExist = this.state.cartArray.some(e => e.product.id === product.id);
    if (isExist === true) {
      this.alertDuplicated(product.id);
    } else {
      this.setState(
        {cartArray: this.state.cartArray.concat({product: product, quantity: 1})},
        () => saveCart(this.state.cartArray),
      );
    }
  } 

  incrQuantity(productId) {
    const newCart = this.state.cartArray.map(function(e) {
      if (e.product.id !== productId) return e;
      return {product: e.product, quantity: e.quantity + 1};
    });
    this.setState({cartArray: newCart}, () => saveCart(this.state.cartArray));
  }
  decrQuantity(productId) {
    const newArray = this.state.cartArray.map(function(e) {
      if (e.product.id !== productId) return e;
      return {product: e.product, quantity: e.quantity - 1};
    });
    this.setState({cartArray: newArray}, () => saveCart(this.state.cartArray));
  }
  removeItem(productId) {
    const newArray = this.state.cartArray.filter(
      e => e.product.id !== productId,
    );
    this.setState({cartArray: newArray}, () => saveCart(this.state.cartArray));
  }
  openMenu() {
    const {open} = this.props;
    open();
  }

  render() {
    const {icons, title} = styles;
    const {navigation} = this.props;
    const {selectedTab, types, topProducts, cartArray} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header onOpen={this.openMenu.bind(this)} />
        <TabNavigator>
          <TabNavigator.Item
            selected={selectedTab === 'home'}
            title="Home"
            onPress={() => this.setState({selectedTab: 'home'})}
            renderIcon={() => <Image source={homeIcon0} style={icons} />}
            renderSelectedIcon={() => <Image source={homeIconS} style={icons}/>}
            selectedTitleStyle={title}>
            <Home 
              navigation={navigation}
              types={types}
              topProducts={topProducts}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === 'cart'}
            title="Cart"
            onPress={() => this.setState({selectedTab: 'cart'})}
            renderIcon={() => <Image source={cartIcon0} style={icons} />}
            renderSelectedIcon={() => <Image source={cartIconS} style={icons} />}
            badgeText={cartArray.length}
            selectedTitleStyle={title}>
            <Cart cartArray={cartArray}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === 'search'}
            title="Search"
            onPress={() => this.setState({selectedTab: 'search'})}
            renderIcon={() => <Image source={searchIcon0} style={icons} />}
            renderSelectedIcon={() => <Image source={searchIconS} style={icons} />}
            selectedTitleStyle={title}>
            <Search />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={selectedTab === 'contact'}
            title="Contact"
            onPress={() => this.setState({selectedTab: 'contact'})}
            renderIcon={() => <Image source={contactIcon0} style={icons} />}
            renderSelectedIcon={() => <Image source={contactIconS} style={icons} />}
            selectedTitleStyle={title}>
            <Contact />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icons: {height: 25, width: 25, padding: 15},
  title: {color:'#437777'},
});
