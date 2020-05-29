import React from 'react';
import {Text, ScrollView} from 'react-native';
import CustomComponents from 'react-native-deprecated-custom-components';

import SearchView from './SearchView';
import ProductDetails from '../ProductDetails/ProductDetails';

export default class Search extends React.Component {
  render() {
    return (
      <CustomComponents.Navigator
        initialRoute={{name: 'SEARCHVIEW'}}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'SEARCHVIEW':
              return <SearchView navigator={navigator} />;
            default:
              return <ProductDetails navigator={navigator} product={route.product} />;
        }
      }}
      />
    );
  }  
}
 