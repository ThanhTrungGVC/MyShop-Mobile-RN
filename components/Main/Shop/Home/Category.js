import React from 'react';
import {Text, View, ImageBackground, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper'

const {height, width} = Dimensions.get('window');

const url = 'http://192.168.1.239/app-server/images/type/';
import banner from '../../../../images/temp/maxi.jpg';
export default class Collection extends React.Component {
  gotoListProduct(category) {
    const {navigator} = this.props;
    navigator.push({name: 'PRODUCTLIST', category});
  }
  render() {
    const {types} = this.props;
    const {wrapper, image, text, cateTitle, cateWrap} = styles;
    return (
      <View style={wrapper}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={text}>LIST OF CATEGORY</Text>
        </View>
        <View style={{flex: 4}}>
          <Swiper>
            {types.map(e => (
              <TouchableOpacity
                onPress={() => this.gotoListProduct(e)}
                key={e.id}>
                  {/* <Image source={{uri: 'http://10.0.2.2/app-server/images/type/' + e.image}} style={image} /> */}
                <ImageBackground
                  style={image}
                  source={{uri: url + e.image}}>
                  <View style={cateWrap}>
                    <Text style={cateTitle}>{e.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
      </View>
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
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    padding: 10,
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
  cateTitle: {
    fontSize: 22,
    color: '#9A9A9A',
  },
  cateWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
