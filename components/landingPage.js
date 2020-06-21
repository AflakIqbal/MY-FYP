import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import { Login } from './LoginComponent';
import { connect } from 'react-redux';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.owner = this.owner.bind(this);
  }
  owner() {
    <Login />;
  }
  //   constructor(props) {
  //     super(props);
  //     this.state = { isToggleOn: true };

  //     this.owner = this.owner.bind(this);
  //   }

  //   owner() {
  //     this.setState((state) => ({
  //       isToggleOn: state.isToggleOn,
  //     }));
  //   }
  render() {
    return (
      <Animatable.View
        animation='zoomInUp'
        duration={2000}
        delay={1000}
        style={styles.landing}
      >
        <Text style={styles.title}>Welcome To SAWARI</Text>
        <View style={styles.container}>
          <Image style={styles.image} source={require('./images/logo.png')} />
        </View>
        <Button
          title=' Login As Owner'
          buttonStyle={styles.button}
          icon={<Icon name='user' type='font-awesome' color='white' />}
          onPress={this.owner}
          style={styles.button}
        />

        <Button
          title=' Login As Customer'
          buttonStyle={styles.button}
          icon={<Icon name='user' type='font-awesome' color='white' />}
          onPress={this.sendMail}
          style={styles.button}
        />
      </Animatable.View>
    );
  }
  static navigationOptions = {
    title: 'Contact',
  };
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 25,
  },
  landing: {
    margin: 15,
    color: 'gray',
    justifyContent: 'center',
    paddingTop: 40,
  },
  container: {
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#512DA8',
    borderRadius: 50,
    margin: 10,
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
