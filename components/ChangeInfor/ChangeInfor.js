import React, { Component } from 'react';

import {
  View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Dimensions, Alert
} from 'react-native';

import backSpecial from '../../images/appIcon/backs.png';

import changeInforAPI from '../../api/changeInforAPI';
import getToken from '../../api/getToken';

import global from '../global';

export default class ChangeInfor extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      txtName: navigation.getParam('userName'),
      txtAddress: navigation.getParam('userAddress'),
      txtPhone: navigation.getParam('userPhone'),
    };
  }

  changeUserInfor() {
    const {txtName, txtAddress, txtPhone} = this.state;
    getToken()
      .then(resToken => changeInforAPI(resToken, txtName, txtPhone, txtAddress))
      .then(user => {
        this.alertSucess();
        global.changeMenu(user);
      })
      .catch(err => console.log(err));
  }

  goToMain() {
    const {navigation} = this.props;
    navigation.navigate('MAIN');
  }

  alertSucess() {
    Alert.alert(
      'NOTICE',
      'Change infor successfully',
      [{text: 'OK', onPress: this.goToMain.bind(this)}],
      {cancelable: false},
    );
  }

  render() {
    const {
      wrapper, header, headerTitle, backIconStyle, body,
      signInContainer, signInTextStyle, textInput
    } = styles;
    const {txtName, txtAddress, txtPhone} = this.state;
    return (
      <View style={wrapper}>
        <View style={header}>
          <View />
          <Text style={headerTitle}>User Infomation</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MAIN')}>
            <Image source={backSpecial} style={backIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={body}>
          <TextInput
            style={textInput}
            placeholder="Enter your name"
            autoCapitalize="none"
            value={txtName}
            onChangeText={txt => this.setState({ ...this.state, txtName: txt })}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={textInput}
            placeholder="Enter your address"
            autoCapitalize="none"
            value={txtAddress}
            onChangeText={txt => this.setState({ ...this.state, txtAddress: txt })}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={textInput}
            placeholder="Enter your phone number"
            autoCapitalize="none"
            value={txtPhone}
            onChangeText={txt => this.setState({ ...this.state, txtPhone: txt })}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={signInContainer} onPress={this.changeUserInfor.bind(this)}>
            <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  header: { 
    flex: 1, 
    backgroundColor: '#437777', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: height / 6,
  },// eslint-disable-line
  headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
  backIconStyle: { width: 30, height: 30 },
  body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#437777',
    borderWidth: 1
  },
  signInTextStyle: {
    color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
  },
  signInContainer: {
    marginHorizontal: 20,
    backgroundColor: '#437777',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  signInStyle: {
    flex: 3,
    marginTop: 50
  }
});

// goBackToMain() {
//     const { navigator } = this.props;
//     navigator.pop();
// }