import React from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import register from '../../api/register'; 
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: '',
    };
  }

  register() {
    const {email, name, password} = this.state;
    register(email, name, password).then(res => {
      if (res === 'THANH_CONG') return this.onSuccess();
      return this.onFail();
    });
  }
  onSuccess() {
    Alert.alert(
      'NOTICE',
      'Sign up successfully',
      [{text: 'OK', onPress: this.props.goToSignIn()}],
      {cancelable: false},
    );
  }

  onFail() {
    Alert.alert(
      'NOTICE',
      'Email was used by other user',
      [{text: 'OK', onPress: () => this.setState({email: ''})}],
      {cancelable: false},
    );
  }

  render() {
    const {inputStyle, bigButton, textStyle} = styles;
    return (
      <View>
        <TextInput
          placeholder="Enter your name" 
          style={inputStyle} 
          value={this.state.name}
          onChangeText={text => this.setState({name: text})}
        />
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
        <TextInput 
          placeholder="Re-enter your password" 
          style={inputStyle} 
          value={this.state.rePassword} 
          onChangeText={text => this.setState({rePassword: text})}
          secureTextEntry
        />
        <TouchableOpacity style={bigButton} onPress={this.register.bind(this)}>
          <Text style={textStyle}>SIGN UP NOW</Text>
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