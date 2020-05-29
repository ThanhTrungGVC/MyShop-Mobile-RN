import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import profileIcon from '../../images/temp/profile.png';

import global from '../global';

import saveToken from '../../api/saveToken';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: false,
      user: null,
    };
    global.changeMenu = this.changeMenu.bind(this);
  }
  changeMenu(user) {
    this.setState({isLogIn: true, user: user});
  }
  onSignOut() {
    this.setState({userName: null, isLogIn: false});
    saveToken('');
  }

  render() {
    const {
      container,
      profileIc,
      btnStyle,
      btnText,
      smallContainer,
      nameText, 
    } = styles;
    const notSignInJSX = (
      <View>
        <TouchableOpacity
          style={btnStyle}
          onPress={() => this.props.navigation.navigate('AUTHENTICATION')}>
          <Text style={btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
    const signInJSX = (
      <View style={smallContainer}>
        <Text style={nameText}>{this.state.isLogIn ? this.state.user.name : ''}</Text>
        <View>
          <TouchableOpacity
            style={btnStyle}
            onPress={() => this.props.navigation.navigate('ORDERHISTORY')}>
            <Text style={btnText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={btnStyle}
            onPress={() =>
              this.props.navigation.navigate('CHANGEINFOR', {
                userName: this.state.user.name,
                userEmail: this.state.user.email,
                userPhone: this.state.user.phone,
                userAddress: this.state.user.address,
              })
            }>
            <Text style={btnText}>Change Infor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={btnStyle}
            onPress={this.onSignOut.bind(this)}>
            <Text style={btnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
    const show = this.state.isLogIn ? signInJSX : notSignInJSX;
    return (
      <View style={container}>
        <Image source={profileIcon} style={profileIc} />
        {show}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#437777',
    borderRightWidth: 3,
    borderColor: '#FFF',
    alignItems: 'center',
  },
  profileIc: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: 50,
    marginBottom: 20,
  },
  btnStyle: {
    height: 40,
    paddingHorizontal: 50,
    backgroundColor: "#FFF",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  btnText: {
    color: '#437777',
    fontSize: 20,
  },
  smallContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    color: '#FFF',
    fontSize: 20,
  },
});

