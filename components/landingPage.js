import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import Login from './Owner/LoginComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBusiness: false,
    };
  }

  owner() {
    this.props.navigation.navigate('Login');
  }

  customer() {
    this.props.navigation.navigate('Login1');
  }

  render() {
    return (
      <Animatable.View
        animation='zoomIn'
        duration={2000}
        delay={1000}
        style={styles.landing}
      >
        {/* <ImageBackground
          source={require('./images/bc3.jpg')}
          style={styles.image}
        > */}
        {/* <ImageBackground
          source={require('./images/CarLanding.png')}
          style={styles.image}
        > */}

        <Image style={styles.image} source={require('./images/logo.png')} />

        <Text style={styles.text1}>{'Login As'}</Text>

        <Button
          title=' Owner'
          buttonStyle={styles.button}
          icon={<Icon name='user' type='font-awesome' color='white' />}
          onPress={() => this.owner()}
        />

        <Button
          title=' Customer'
          buttonStyle={styles.button}
          icon={<Icon name='user' type='font-awesome' color='white' />}
          onPress={() => this.customer()}
        />
        <Image
          style={styles.image2}
          source={require('./images/CarLanding.png')}
        ></Image>
        {this.state.showBusiness === true && <Login />}
      </Animatable.View>
    );
  }
  static navigationOptions = {
    title: 'Welcome to SAWARI',
  };
}

const styles = StyleSheet.create({
  image: {},
  landing: {
    color: 'gray',
    justifyContent: 'center',
    paddingTop: 40,
  },

  image: {
    //marginLeft: 90,

    alignSelf: 'center',
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  text1: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'serif',
  },
  image2: {
    // resizeMode: 'cover',
    // justifyContent: 'center',
    width: 400,
    height: 250,
    // marginBottom: 30,
  },
  button: {
    backgroundColor: '#512DA8',
    borderRadius: 50,
    margin: 10,
    alignSelf: 'center',
    //marginLeft: 60,
    width: 200,
  },
  card: {
    borderColor: 'black',
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
    textDecorationColor: 'blue',
    textDecorationStyle: 'dotted',
  },
});

export default Landing;
