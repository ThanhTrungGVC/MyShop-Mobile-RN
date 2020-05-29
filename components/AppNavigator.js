import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'; 
import {createDrawerNavigator} from 'react-navigation-drawer';

import Authentication from './Authentication/Authentication';
import ChangeInfor from './ChangeInfor/ChangeInfor';
import Main from './Main/Main';
import OrderHistory from './OrderHistory/OrderHistory'; 
import Menu from '../components/Main/Menu'; 

import ProductDetails from './Main/Shop/ProductDetails/ProductDetails';
import ProductList from './Main/Shop/ProductList/ProductList';

const AppNavigator = createStackNavigator(
  {
    AUTHENTICATION: {screen: Authentication},
    CHANGEINFOR: {screen: ChangeInfor},
    MAIN: {screen: Main},
    ORDERHISTORY: {screen: OrderHistory},
    MENU: {screen: Menu},
    PRODUCTDETAILS: {screen: ProductDetails},
    PRODUCTLIST: {screen: ProductList}, 
  },
  {
    initialRouteName: 'MAIN',
    headerMode: 'none',
  },
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;