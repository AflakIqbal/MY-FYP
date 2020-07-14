import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Icon } from 'react-native';
import { baseUrl } from '../../shared/baseUrl';
import { baseUrlNode } from '../../shared/baseUrl';
import { AsyncStorage } from 'react-native';

export default class UserProfileView1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(baseUrlNode + 'api/Customer/auth', {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ customer: responseJson });
        console.log(this.state.customer);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={require('../images/aflak.jpg')}
            />

            <Text style={styles.name}>{this.state.customer.name} </Text>
            <Text style={styles.userInfo}> {this.state.customer.email} </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.data}>
            Address: {this.state.customer.address}
          </Text>
          <Text style={styles.data}>City: {this.state.customer.city}</Text>
          <Text style={styles.data}>
            Contact: {this.state.customer.cellPhone}
          </Text>
          <Text style={styles.data}>
            {'Designation: Work as Customer at Sawari'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'indigo',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  button: {
    margin: 30,
  },
  body: {
    margin: 40,
    height: 500,
  },
  data: {
    padding: 15,
    fontSize: 20,
    fontFamily: 'serif',
  },
});
