import React from 'react';
import {Text, ScrollView} from 'react-native';
import CustomComponents from 'react-native-deprecated-custom-components';

import HomeView from './HomeView';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductList from '../ProductList/ProductList';

export default class Home extends React.Component {
  render() {
    const {types, topProducts} = this.props;
    return (
      <CustomComponents.Navigator
        initialRoute={{name: 'HOMEVIEW'}}
        renderScene={(route, navigator) => {
        switch(route.name) { 
            case 'HOMEVIEW':
              return (
                <HomeView
                  navigator={navigator}  
                  types={types}
                  topProducts={topProducts}
                />
              );
            case 'PRODUCTLIST':
              return <ProductList navigator={navigator} category={route.category} collection={route.collection} />;
            default:
              return <ProductDetails navigator={navigator} product={route.product}/>;
        }
      }}
      />
    );
  }
}
  