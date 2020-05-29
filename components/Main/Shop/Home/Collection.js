import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import banner from '../../../../images/temp/banner.jpg';

const { width, height } = Dimensions.get('window');

export default class Category extends React.Component {
  gotoListProduct(category) {
    const { navigator } = this.props;
    navigator.push({ name: 'PRODUCTLIST', category: {name: 'Spring Collection', id: 'COLLECTION'}});
  }
  render() {
    const { wrapper, image, text } = styles;
    return (
      <TouchableOpacity onPress={this.gotoListProduct.bind(this)}>
        <View style={wrapper}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={text}>SPRING COLLECTION</Text>
          </View>
          <View style={{ flex: 4 }}>
            <Image source={banner} style={image} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: '#2E272B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    padding: 10
  },
  image: {
    height: imageHeight,
    width: imageWidth,
  },
  text: {
    fontSize: 20,
    color: '#AFAEAF',
    justifyContent: 'space-around',
  },
});
