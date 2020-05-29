import React from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';

import signIn from '../../api/signIn';
import global from '../global';

import saveToken from '../../api/saveToken';
import getToken from '../../api/getToken';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }
  componentDidMount() {
    getToken().then(a => console.log('Token:' + a));
  }
  onSignIn() {
    const {email, password} = this.state;
    signIn(email, password)
      .then(res => { 
        global.changeMenu(res.user);
        this.props.navigation.navigate('MAIN');
        saveToken(res.token);
      })
      .catch(err => console.log(err));
  }
  render() {
    const {inputStyle, bigButton, textStyle} = styles;
    return (
      <View>
        <TextInput   
          placeholder="Enter your email" 
          style={inputStyle} 
          value={this.state.email}
          onChangeText={text => this.setState({email: text})}
        />
        <TextInput 
          placeholder="Enter your password" 
          style={inputStyle} 
          value={this.state.password}
          onChangeText={text => this.setState({password: text})}
          secureTextEntry
        />
        <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
          <Text style={textStyle}>SIGN IN NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  }
});