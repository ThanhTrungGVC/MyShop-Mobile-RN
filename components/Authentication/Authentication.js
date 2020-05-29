import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput} from 'react-native';

import icBack from '../../images/appIcon/back_white.png';
import icLogo from '../../images/appIcon/dress1.png';

import register from '../../api/register';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSignIn: true};
  }

  goToSignIn() {
    this.setState({isSignIn: true});
  }

  signIn = () => {
    this.setState({isSignIn: true});
  };

  signUp = () => {
    this.setState({isSignIn: false});
  };

  render() {
    const {
      row1,
      icons,
      title,
      wrapper,
      controlStyle,
      signInStyle,
      signOutStyle,
      activeStyle,
      inactiveStyle,
      logoStyle
    } = styles;
    const {isSignIn} = this.state;
    const {navigation} = this.props;

    const mainJSX = this.state.isSignIn ? <SignIn navigation={navigation}/> : <SignUp goToSignIn={this.goToSignIn.bind(this)}/>;
    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MAIN')}>
            <Image source={icBack} style={icons} />
          </TouchableOpacity>
          <Text style={title}>HomeShop</Text>
          <Image source={icLogo} style={logoStyle} />
        </View>

        {mainJSX}

        <View style={controlStyle}>
          <TouchableOpacity style={signInStyle} onPress={this.signIn.bind(this)}>
            <Text style={isSignIn ? activeStyle : inactiveStyle}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={signOutStyle} onPress={this.signUp.bind(this)}>
            <Text style={!isSignIn ? activeStyle : inactiveStyle}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: height / 5,
    backgroundColor: '#437777',
    padding: 10,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {height: height / 25, backgroundColor: '#FFF', paddingLeft: 10},
  icons: {height: 25, width: 25},
  title: {
    color: '#FFF',
    fontSize: 21,
    fontFamily: 'Zapfino',
    paddingTop: 23,
  },
  controlStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  signInStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 1,
  },
  signOutStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 1,
  },
  inactiveStyle: {
    color: '#AFAEAF',
  },
  activeStyle: {
    color: '#437777',
  },
  inputStyle: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 30,
  },
  bigButton: {
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
  logoStyle: {
    height: 85,
    width: 45,
  }
});