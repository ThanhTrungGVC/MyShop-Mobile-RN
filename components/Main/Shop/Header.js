import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet} 
from 'react-native';

import icMenu from '../../../images/appIcon/ic_menu.png';
import dress1 from '../../../images/appIcon/dress1.png';

import global from '../../global';

import searchAPI from '../../../api/searchAPI';

//onPress={this.props.onOpen}
//onPress={this.toggleDrawer.bind(this)}
const {height} = Dimensions.get('window');


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {txtInput: ''};
  }
  onSearch() {
    const {txtInput} = this.state;
    searchAPI(txtInput)
      .then(res => global.search(res))
      .catch(err => console.log(err));
    this.setState({txtInput: ''})
  }
  render() {
    const {wrapper, row1, input, icons, title, logo} = styles;
    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity onPress={this.props.onOpen}>
            <Image source={icMenu} style={icons} />
          </TouchableOpacity>
          <Text style={title}>HomeShop</Text>
          <Image source={dress1} style={logo} />
        </View>
        <TextInput 
          style={input} 
          placeholder="What do you want to buy?"
          onFocus={() => global.goToSearch()}
          value={this.state.txtInput}
          onChangeText={text => this.setState({txtInput: text})} 
          onSubmitEditing={this.onSearch.bind(this)}
        />
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 6,
    backgroundColor: '#437777',
    padding: 10,
    justifyContent: 'space-around',
  },
  row1: {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20},
  input: {height: height / 27, backgroundColor: '#FFF', paddingLeft: 20},
  icons: {height: 25, width: 25},
  logo: {height: 85, width: 45},
  title: { 
    color: '#FFF',
    fontSize: 21,
    paddingTop: 23,
    fontFamily: 'Zapfino',
  },
});
