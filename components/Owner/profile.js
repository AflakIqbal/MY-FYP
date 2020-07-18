import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Icon } from 'react-native';
import { baseUrl } from '../../shared/baseUrl';
import { baseUrlNode } from '../../shared/baseUrl';
import { AsyncStorage } from 'react-native';

export default class UserProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getData();
    this.listener = this.props.navigation.addListener('didFocus', this.getData);
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(baseUrlNode + 'api/owner/auth', {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ owner: responseJson });
        console.log(this.state.owner);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.owner.imageURI);
    console.log(this.state.owner.name);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{ uri: this.state.owner.imageURI }}
            />

            <Text style={styles.name}>{this.state.owner.name} </Text>
            <Text style={styles.userInfo}> {this.state.owner.email} </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.data}>Address: {this.state.owner.address}</Text>
          <Text style={styles.data}>City: {this.state.owner.city}</Text>
          <Text style={styles.data}>Contact: {this.state.owner.cellPhone}</Text>
          <Text style={styles.data}>
            {'Designation: Work as Owner at Sawari'}
          </Text>

          <Button
            onPress={() => navigate('EditInfo', { owner: this.state.owner })}
            title=' Edit Information'
          />
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
    width: 120,
    height: 120,
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
